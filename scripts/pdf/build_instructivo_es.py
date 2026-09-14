# -*- coding: utf-8 -*-
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    NextPageTemplate, PageBreak, HRFlowable, Image, KeepTogether
)
from reportlab.platypus.flowables import Flowable

# ---- brand tokens (official palette, extracted from Brandbook VIGHI.pdf, p.7) ----
BLUE = HexColor("#440059")       # Color principal
ACCENT = HexColor("#572089")     # Color secundario -- used for text-weight accents (contrast-safe)
ACCENT_LIGHT = HexColor("#D39DED")  # Acento
ACCENT_PALE = HexColor("#ECD3F8")   # Acento (claro)
TEXT_BLACK = HexColor("#000000")    # Textos
PAPER = HexColor("#F1F1F1")      # Fondo secundario
BG_WHITE = HexColor("#FEFEFE")   # Fondo
SLATE = HexColor("#595959")      # neutral grey for de-emphasized copy (not in brandbook, kept unbranded on purpose)
LINE = HexColor("#E2DCE7")       # light tint derived from Fondo secundario for hairlines

# Repo root -- this script lives at <repo>/scripts/pdf/, so go up two levels.
PROJECT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOGO_PATH = os.path.join(PROJECT, "src", "assets", "fav-icon.png")
LOGO_WHITE_PATH = os.path.join(PROJECT, "src", "assets", "icon-white.png")
OUT_PATH = os.path.join(PROJECT, "public", "instructivo-derivantes.pdf")

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    name="Eyebrow", fontName="Helvetica-Bold", fontSize=9, tracking=1,
    textColor=ACCENT, spaceAfter=4, leading=11,
))
styles.add(ParagraphStyle(
    name="H1", fontName="Helvetica-Bold", fontSize=22, textColor=BLUE,
    spaceAfter=10, leading=26,
))
styles.add(ParagraphStyle(
    name="H2", fontName="Helvetica-Bold", fontSize=15, textColor=BLUE,
    spaceBefore=4, spaceAfter=8, leading=18,
))
styles.add(ParagraphStyle(
    name="H3", fontName="Helvetica-Bold", fontSize=11, textColor=BLUE,
    spaceBefore=2, spaceAfter=4, leading=14,
))
styles.add(ParagraphStyle(
    name="Body", fontName="Helvetica", fontSize=9.5, textColor=TEXT_BLACK,
    leading=14, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BodySlate", fontName="Helvetica", fontSize=9.5, textColor=SLATE,
    leading14=14, leading=14, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BulletItem", fontName="Helvetica", fontSize=9.3, textColor=TEXT_BLACK,
    leading=13, leftIndent=10, spaceAfter=3, bulletIndent=0,
))
styles.add(ParagraphStyle(
    name="CoverTitle", fontName="Helvetica-Bold", fontSize=30, textColor=BG_WHITE,
    leading=34, spaceAfter=10,
))
styles.add(ParagraphStyle(
    name="CoverSub", fontName="Helvetica", fontSize=12, textColor=ACCENT_PALE,
    leading=17,
))
styles.add(ParagraphStyle(
    name="CoverFooter", fontName="Helvetica", fontSize=8.5, textColor=ACCENT_LIGHT,
    leading=13,
))
styles.add(ParagraphStyle(
    name="TocItem", fontName="Helvetica", fontSize=10.5, textColor=BLUE,
    leading=22,
))


def cover_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BLUE)
    canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=1, stroke=0)
    # accent corner block
    canvas.setFillColor(ACCENT)
    canvas.rect(0, doc.pagesize[1] - 6 * mm, doc.pagesize[0], 6 * mm, fill=1, stroke=0)
    if os.path.exists(LOGO_WHITE_PATH):
        canvas.drawImage(
            LOGO_WHITE_PATH, 25 * mm, doc.pagesize[1] - 60 * mm,
            width=22 * mm, height=22 * mm * (160 / 182), mask="auto",
            preserveAspectRatio=True,
        )
    canvas.restoreState()


def inner_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=1, stroke=0)
    # top accent rule
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(1.4)
    canvas.line(20 * mm, doc.pagesize[1] - 15 * mm, doc.pagesize[0] - 20 * mm, doc.pagesize[1] - 15 * mm)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(BLUE)
    canvas.drawString(20 * mm, doc.pagesize[1] - 12 * mm, "CAP VIGHI")
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawRightString(doc.pagesize[0] - 20 * mm, doc.pagesize[1] - 12 * mm, "INSTRUCTIVO PARA MÉDICOS DERIVANTES")
    # footer
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(20 * mm, 14 * mm, doc.pagesize[0] - 20 * mm, 14 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawString(20 * mm, 10 * mm, "Centro de Anatomía Patológica Dra. Susana Vighi · Concepción Arenal 3732, CABA")
    canvas.drawRightString(doc.pagesize[0] - 20 * mm, 10 * mm, f"Página {doc.page - 1}")
    canvas.restoreState()


def bullet_list(items, style="BulletItem"):
    flows = []
    for it in items:
        flows.append(Paragraph(f'<font color="#572089">&#9679;</font>&nbsp;&nbsp;{it}', styles[style]))
    return flows


def step_card(n, title, text, width):
    data = [[
        Paragraph(f'<font color="#572089" size="16"><b>{n}</b></font>', styles["Body"]),
        [Paragraph(f'<b>{title}</b>', styles["H3"]), Paragraph(text, styles["Body"])],
    ]]
    t = Table(data, colWidths=[14 * mm, width - 14 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), BG_WHITE),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t


def requisito_card_content(tipo, items):
    body = [Paragraph(f'<b>{tipo}</b>', styles["H3"])]
    body += bullet_list(items)
    return body


def requisito_row(pair, col_w, gap_w):
    # Renders one or two cards side by side in a SINGLE table row, so the box
    # around each card stretches to the row's full height (no ragged bottoms
    # when one card has more lines than its neighbor).
    if len(pair) == 2:
        data = [[requisito_card_content(*pair[0]), "", requisito_card_content(*pair[1])]]
        col_widths = [col_w, gap_w, col_w]
        box_cols = [0, 2]
    else:
        data = [[requisito_card_content(*pair[0])]]
        col_widths = [col_w]
        box_cols = [0]
    t = Table(data, colWidths=col_widths)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]
    for c in box_cols:
        style.append(("BOX", (c, 0), (c, 0), 0.7, LINE))
        style.append(("BACKGROUND", (c, 0), (c, 0), BG_WHITE))
    t.setStyle(TableStyle(style))
    return t


doc = BaseDocTemplate(OUT_PATH, pagesize=A4,
                       leftMargin=20 * mm, rightMargin=20 * mm,
                       topMargin=20 * mm, bottomMargin=20 * mm)
frame_full = Frame(25 * mm, 0, doc.pagesize[0] - 50 * mm, doc.pagesize[1], id="cover", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
frame_inner = Frame(20 * mm, 20 * mm, doc.pagesize[0] - 40 * mm, doc.pagesize[1] - 40 * mm, id="inner")

doc.addPageTemplates([
    PageTemplate(id="Cover", frames=[frame_full], onPage=cover_page),
    PageTemplate(id="Inner", frames=[frame_inner], onPage=inner_page),
])

CONTENT_W = doc.pagesize[0] - 40 * mm

story = []

# ---------------- COVER ----------------
story.append(Spacer(1, 95 * mm))
story.append(Paragraph("Instructivo para<br/>Médicos Derivantes", styles["CoverTitle"]))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "Protocolos de fijación, requisitos por tipo de estudio, tiempos de entrega y "
    "coordinación con nuestro laboratorio de anatomía patológica.",
    styles["CoverSub"],
))
story.append(Spacer(1, 60 * mm))
story.append(Paragraph(
    "Centro de Anatomía Patológica Dra. Susana Vighi<br/>"
    "Concepción Arenal 3732, CABA · Argentina<br/>"
    "www.susanavighi.com.ar",
    styles["CoverFooter"],
))

story.append(NextPageTemplate("Inner"))
story.append(PageBreak())

# ---------------- CIRCUITO ----------------
story.append(Paragraph("CIRCUITO DE DERIVACIÓN", styles["Eyebrow"]))
story.append(Paragraph("De la toma al informe", styles["H1"]))
story.append(Paragraph(
    "Cuatro pasos, pensados para minimizar demoras y asegurar trazabilidad completa "
    "de cada muestra recibida.",
    styles["BodySlate"],
))
story.append(Spacer(1, 10))

pasos = [
    ("01", "Solicitud", "Completá el formulario con datos del paciente, diagnóstico presuntivo, estudios previos y datos del profesional derivante."),
    ("02", "Fijación de la muestra", "Formol al 10% tamponado en volumen 10:1 respecto al tejido. Recipiente rotulado con nombre y DNI del paciente."),
    ("03", "Envío o retiro", "Retiro sin cargo dentro de CABA y GBA coordinando por teléfono. También recibimos envíos de todo el país."),
    ("04", "Recepción y trazabilidad", "Cada muestra recibe código único de trazabilidad y confirmación de recepción al médico derivante."),
]
for n, title, text in pasos:
    story.append(step_card(n, title, text, CONTENT_W))
    story.append(Spacer(1, 6))

story.append(Spacer(1, 6))
warn_data = [[Paragraph(
    '<font color="#572089"><b>IMPORTANTE&nbsp;&nbsp;&#8212;&nbsp;&nbsp;</b></font>'
    "Ante cualquier duda sobre fijación, transporte o tiempos, comunicate con nuestra "
    "coordinación médica antes de enviar la muestra.",
    styles["Body"],
)]]
warn_t = Table(warn_data, colWidths=[CONTENT_W])
warn_t.setStyle(TableStyle([
    ("BOX", (0, 0), (-1, -1), 0.7, ACCENT),
    ("BACKGROUND", (0, 0), (-1, -1), ACCENT_PALE),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
]))
story.append(warn_t)

story.append(PageBreak())

# ---------------- REQUISITOS ----------------
story.append(Paragraph("REQUISITOS POR TIPO DE ESTUDIO", styles["Eyebrow"]))
story.append(Paragraph("Preparación de la muestra", styles["H1"]))
story.append(Spacer(1, 8))

requisitos = [
    ("Biopsia por punción / endoscópica", [
        "Formol al 10% tamponado",
        "Rotulado con nombre y DNI",
        "Solicitud con localización anatómica precisa",
        "Adjuntar informe endoscópico si corresponde",
    ]),
    ("Pieza quirúrgica", [
        "Fijación inmediata en formol 10% (volumen 10:1)",
        "No cortar previo al envío salvo indicación",
        "Solicitud con dato clínico y quirúrgico completo",
        "Coordinar retiro dentro de las 24hs",
    ]),
    ("Citología ginecológica (PAP)", [
        "Extendido en portaobjeto identificado",
        "Fijación con spray citológico o alcohol 96°",
        "Datos clínicos: FUM, terapia hormonal, antecedentes",
    ]),
    ("Punción con aguja fina (PAAF)", [
        "Extendidos secados al aire (Diff-Quick) y fijados (Papanicolaou)",
        "Material en medio líquido para bloque celular si aplica",
        "Solicitud con localización, tamaño y ecografía",
    ]),
    ("Biopsia intraoperatoria (congelación)", [
        "Coordinar previamente por teléfono",
        "Muestra en fresco, sin fijar, en recipiente estéril",
        "Traslado inmediato al laboratorio",
    ]),
    ("Estudios moleculares / IHQ compleja", [
        "Muestra fijada en formol 10% (mínimo 6 hs, máximo 48 hs)",
        "Bloque de parafina con material representativo",
        "Solicitud detallando marcadores requeridos",
    ]),
]

gap_w = 6 * mm
col_w = (CONTENT_W - gap_w) / 2
for i in range(0, len(requisitos), 2):
    pair = requisitos[i:i + 2]
    story.append(requisito_row(pair, col_w, gap_w))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# ---------------- TIEMPOS ----------------
story.append(Paragraph("TIEMPOS DE ENTREGA PROMEDIO", styles["Eyebrow"]))
story.append(Paragraph("Días hábiles desde la recepción", styles["H1"]))
story.append(Spacer(1, 8))

tiempos_data = [
    ["Estudio", "Tiempo estimado"],
    ["Papanicolaou", "3 días hábiles"],
    ["Biopsia", "6 días hábiles"],
    ["Inmunohistoquímica", "7 días hábiles"],
    ["Biopsia con IHQ", "9 días hábiles"],
]
tiempos_t = Table(tiempos_data, colWidths=[CONTENT_W * 0.65, CONTENT_W * 0.35])
tiempos_t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), BLUE),
    ("TEXTCOLOR", (0, 0), (-1, 0), BG_WHITE),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTSIZE", (0, 0), (-1, 0), 9.5),
    ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
    ("FONTSIZE", (0, 1), (-1, -1), 9.5),
    ("TEXTCOLOR", (0, 1), (0, -1), HexColor("#2b2438")),
    ("TEXTCOLOR", (1, 1), (1, -1), ACCENT),
    ("FONTNAME", (1, 1), (1, -1), "Helvetica-Bold"),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [BG_WHITE, ACCENT_PALE]),
    ("GRID", (0, 0), (-1, -1), 0.6, LINE),
    ("TOPPADDING", (0, 0), (-1, -1), 9),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ("LEFTPADDING", (0, 0), (-1, -1), 12),
]))
story.append(tiempos_t)
story.append(Spacer(1, 10))
story.append(Paragraph(
    "Los estudios de mayor complejidad (biología molecular, técnicas especiales) pueden "
    "requerir plazos adicionales. La biopsia intraoperatoria (congelación) se informa en el acto quirúrgico.",
    styles["BodySlate"],
))

story.append(PageBreak())

# ---------------- CONTACTO ----------------
story.append(Paragraph("COORDINACIÓN MÉDICA", styles["Eyebrow"]))
story.append(Paragraph("Hablemos directamente", styles["H1"]))
story.append(Spacer(1, 8))

contact_rows = [
    ["Líneas rotativas", "(5411) 4551-7752 · (5411) 4551-7267 · (5411) 2035-9667"],
    ["Coordinación de derivaciones", "anatomia.patologica@susanavighi.com.ar"],
    ["Solicitud de servicio", "solicituddeservicio@susanavighi.com.ar"],
    ["Dirección", "Concepción Arenal 3732, Ciudad Autónoma de Buenos Aires, C1427EKH"],
    ["Horario de atención", "Lunes a viernes de 08:00 a 20:00 hs"],
]
contact_t = Table(contact_rows, colWidths=[CONTENT_W * 0.34, CONTENT_W * 0.66])
contact_t.setStyle(TableStyle([
    ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
    ("FONTSIZE", (0, 0), (-1, -1), 9.5),
    ("TEXTCOLOR", (0, 0), (0, -1), BLUE),
    ("TEXTCOLOR", (1, 0), (1, -1), HexColor("#2b2438")),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, 0), (-1, -2), 0.5, LINE),
    ("TOPPADDING", (0, 0), (-1, -1), 9),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
]))
story.append(contact_t)

story.append(Spacer(1, 16))
story.append(Paragraph(
    "Este instructivo resume la información publicada en "
    "<font color='#572089'>susanavighi.com.ar/derivantes</font>. "
    "Ante cambios de protocolo, la versión vigente en el sitio web prevalece sobre copias impresas.",
    styles["BodySlate"],
))

doc.build(story)
print("OK ->", OUT_PATH)
