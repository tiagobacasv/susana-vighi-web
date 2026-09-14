# -*- coding: utf-8 -*-
import os
from datetime import date
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, KeepTogether,
)

# ---- brand tokens (official palette, Brandbook VIGHI.pdf, p.7) ----
BLUE = HexColor("#440059")
ACCENT = HexColor("#572089")
ACCENT_LIGHT = HexColor("#D39DED")
ACCENT_PALE = HexColor("#ECD3F8")
TEXT_BLACK = HexColor("#000000")
PAPER = HexColor("#F1F1F1")
BG_WHITE = HexColor("#FEFEFE")
SLATE = HexColor("#595959")
LINE = HexColor("#B9B9B9")

# Repo root -- this script lives at <repo>/scripts/pdf/, so go up two levels.
PROJECT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOGO_PATH = os.path.join(PROJECT, "src", "assets", "fav-icon.png")
OUT_PATH = os.path.join(PROJECT, "public", "formulario-derivacion.pdf")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="FormTitle", fontName="Helvetica-Bold", fontSize=17, textColor=BLUE, leading=20))
styles.add(ParagraphStyle(name="FormMeta", fontName="Helvetica", fontSize=8, textColor=SLATE, leading=11, alignment=2))
styles.add(ParagraphStyle(name="FormSubtitle", fontName="Helvetica", fontSize=8, textColor=SLATE, leading=11, alignment=1))
styles.add(ParagraphStyle(name="SectionNum", fontName="Helvetica-Bold", fontSize=9, textColor=BG_WHITE, leading=11, alignment=1))
styles.add(ParagraphStyle(name="SectionTitle", fontName="Helvetica-Bold", fontSize=11, textColor=BLUE, leading=13))
styles.add(ParagraphStyle(name="SectionSub", fontName="Helvetica", fontSize=7.5, textColor=SLATE, leading=10))
styles.add(ParagraphStyle(name="FieldLabel", fontName="Helvetica-Bold", fontSize=7, textColor=ACCENT, leading=9))
styles.add(ParagraphStyle(name="CheckLabel", fontName="Helvetica", fontSize=8.5, textColor=TEXT_BLACK, leading=11))
styles.add(ParagraphStyle(name="Small", fontName="Helvetica", fontSize=7.3, textColor=SLATE, leading=10))
styles.add(ParagraphStyle(name="ConsentText", fontName="Helvetica", fontSize=7.3, textColor=SLATE, leading=10.5))
styles.add(ParagraphStyle(name="SigLabel", fontName="Helvetica", fontSize=7.5, textColor=SLATE, leading=10))


def inner_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BG_WHITE)
    canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(16 * mm, 14 * mm, doc.pagesize[0] - 16 * mm, 14 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(SLATE)
    canvas.drawString(16 * mm, 10 * mm,
                       "Centro de Anatomía Patológica Dra. Susana Vighi · Concepción Arenal 3732, CABA · (5411) 4551-7752")
    canvas.drawRightString(doc.pagesize[0] - 16 * mm, 10 * mm, f"Página {canvas.getPageNumber()}")
    canvas.restoreState()


doc = BaseDocTemplate(OUT_PATH, pagesize=A4,
                       leftMargin=16 * mm, rightMargin=16 * mm,
                       topMargin=5 * mm, bottomMargin=16 * mm)
frame = Frame(16 * mm, 16 * mm, doc.pagesize[0] - 32 * mm, doc.pagesize[1] - 21 * mm, id="f")
doc.addPageTemplates([PageTemplate(id="Form", frames=[frame], onPage=inner_page)])

CW = doc.pagesize[0] - 32 * mm
story = []


def hex_line():
    return Table([[""]], colWidths=[CW], rowHeights=[0.1])


def section_header(n, title, sub=""):
    badge = Table([[Paragraph(str(n), styles["SectionNum"])]], colWidths=[6 * mm], rowHeights=[6 * mm])
    badge.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ACCENT),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    title_block = [Paragraph(title, styles["SectionTitle"])]
    if sub:
        title_block.append(Paragraph(sub, styles["SectionSub"]))
    t = Table([[badge, title_block]], colWidths=[8 * mm, CW - 8 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("LINEBELOW", (0, 0), (-1, -1), 1, ACCENT_LIGHT),
        ("BOTTOMPADDING", (1, 0), (1, 0), 3),
    ]))
    return t


FIELD_GAP = 6 * mm


def field_row(fields, height=6 * mm, total_width=None):
    """fields: list of (label, weight); weights are fractions of the row width
    (need not sum to 1 -- they're normalized). A real empty gap COLUMN is
    inserted between fields so underlines never touch/merge."""
    total_width = CW if total_width is None else total_width
    n = len(fields)
    total_gap = FIELD_GAP * (n - 1)
    available = total_width - total_gap
    weight_sum = sum(w for _, w in fields)

    col_widths = []
    label_cells = []
    blank_cells = []
    field_cols = []
    col = 0
    for i, (label, w) in enumerate(fields):
        field_w = available * (w / weight_sum)
        col_widths.append(field_w)
        field_cols.append(col)
        label_cells.append(Paragraph(label.upper(), styles["FieldLabel"]) if label else "")
        blank_cells.append("")
        col += 1
        if i < n - 1:
            col_widths.append(FIELD_GAP)
            label_cells.append("")
            blank_cells.append("")
            col += 1

    t = Table([label_cells, blank_cells], colWidths=col_widths, rowHeights=[4.2 * mm, height])
    style = [
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]
    for c in field_cols:
        style.append(("LINEBELOW", (c, 1), (c, 1), 0.8, TEXT_BLACK))
    t.setStyle(TableStyle(style))
    return t


def checkbox(label):
    box = Table([[""]], colWidths=[3.6 * mm], rowHeights=[3.6 * mm])
    box.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.8, TEXT_BLACK),
        ("BACKGROUND", (0, 0), (-1, -1), BG_WHITE),
    ]))
    lbl = Paragraph(label, styles["CheckLabel"])
    t = Table([[box, lbl]], colWidths=[4.5 * mm, None])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (1, 0), (1, 0), 6 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def blank_box(height):
    t = Table([[""]], colWidths=[CW], rowHeights=[height])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), BG_WHITE),
    ]))
    return t


# ============================================================ HEADER
if os.path.exists(LOGO_PATH):
    from reportlab.platypus import Image
    logo = Image(LOGO_PATH, width=14 * mm, height=14 * mm)
else:
    logo = ""
header_text = [
    Paragraph("Formulario de Derivación de Muestra", styles["FormTitle"]),
    Paragraph("CAP VIGHI", styles["FormSubtitle"]),
]
header = Table([[logo, header_text,
                  Paragraph(f"Formulario CAP-FD · Rev. {date.today().strftime('%m/%Y')}", styles["FormMeta"])]],
                colWidths=[17 * mm, CW - 17 * mm - 45 * mm, 45 * mm])
header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
]))
story.append(header)
story.append(Spacer(1, 1))
story.append(Paragraph(
    "Completar con letra clara y mayúscula.",
    styles["Small"],
))
story.append(Spacer(1, 3))

# ============================================================ 1. PACIENTE
story.append(section_header(1, "Datos del paciente"))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Apellido y nombre", 0.5),
    ("DNI", 0.25),
    ("Fecha de nacimiento", 0.25),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Sexo", 1 / 3),
    ("Obra social / prepaga", 1 / 3),
    ("N° de afiliado", 1 / 3),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Teléfono de contacto", 0.5),
    ("Email de contacto", 0.5),
], height=6.5 * mm))
story.append(Spacer(1, 6))

# ============================================================ 2. MEDICO
story.append(section_header(2, "Médico e institución derivante"))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Médico derivante", 0.45),
    ("Matrícula (MN / MP)", 0.25),
    ("Institución de origen", 0.3),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Teléfono", 0.33),
    ("Email para el informe", 0.67),
], height=6.5 * mm))
story.append(Spacer(1, 6))

# ============================================================ 3. MUESTRA
story.append(section_header(3, "Datos de la muestra",
             "Completar una fila por cada muestra enviada."))
story.append(Spacer(1, 4))
sample_header = ["N°", "Tipo de muestra / sitio anatómico", "Fecha y hora de toma", "N° recip.", "Fijador", "Procedimiento"]
sample_rows = [sample_header] + [["", "", "", "", "", ""] for _ in range(4)]
sample_w = [8 * mm, CW * 0.30, CW * 0.20, 14 * mm, CW * 0.14, CW * 0.16]
sample_t = Table(sample_rows, colWidths=sample_w, rowHeights=[7 * mm] + [9 * mm] * 4)
sample_t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), ACCENT),
    ("TEXTCOLOR", (0, 0), (-1, 0), BG_WHITE),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTSIZE", (0, 0), (-1, 0), 7),
    ("ALIGN", (0, 0), (-1, 0), "CENTER"),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("GRID", (0, 0), (-1, -1), 0.6, LINE),
    ("TOPPADDING", (0, 0), (-1, 0), 5),
    ("BOTTOMPADDING", (0, 0), (-1, 0), 5),
]))
story.append(sample_t)
story.append(Spacer(1, 6))

# ============================================================ 4. CLINICA
story.append(section_header(4, "Información clínica"))
story.append(Spacer(1, 4))
story.append(Paragraph("DIAGNÓSTICO PRESUNTIVO / HISTORIA CLÍNICA RELEVANTE", styles["FieldLabel"]))
story.append(Spacer(1, 3))
story.append(blank_box(16 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Estudios previos relevantes", 0.6),
    ("FUM / terapia hormonal (si aplica)", 0.4),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(checkbox("Estudio urgente / STAT — coordinado previamente con el laboratorio"))
story.append(Spacer(1, 6))

# ============================================================ 5. ESTUDIO SOLICITADO
section5_head = section_header(5, "Estudio solicitado")
half = CW / 2 - 2 * mm
col_left = Table([
    [checkbox("Histopatología de rutina")],
    [Spacer(1, 4)],
    [checkbox("Biología molecular")],
    [Spacer(1, 4)],
    [checkbox("Congelación intraoperatoria")],
], colWidths=[half])
col_right = Table([
    [checkbox("Inmunohistoquímica — marcadores:")],
    [Spacer(1, 3)],
    [field_row([("", 1.0)], height=6 * mm, total_width=half - 4 * mm)],
    [Spacer(1, 4)],
    [checkbox("Segunda opinión diagnóstica")],
], colWidths=[half])
two_col = Table([[col_left, col_right]], colWidths=[half, half])
two_col.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
]))
story.append(KeepTogether([section5_head, Spacer(1, 4), two_col]))
story.append(Spacer(1, 6))

# ============================================================ 6. FIRMA Y CONSENTIMIENTO
story.append(section_header(6, "Firma y consentimiento"))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "Declaro que los datos consignados son correctos y autorizo el tratamiento de los datos personales "
    "aquí incluidos conforme a la Ley 25.326 de Protección de Datos Personales, con la finalidad exclusiva "
    "de procesar el presente estudio.",
    styles["ConsentText"],
))
story.append(Spacer(1, 3))
story.append(KeepTogether([field_row([
    ("Firma del médico derivante", 0.45),
    ("Aclaración", 0.35),
    ("Fecha", 0.2),
], height=7 * mm)]))

doc.build(story)
print("OK ->", OUT_PATH)
