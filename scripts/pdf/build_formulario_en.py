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
OUT_PATH = os.path.join(PROJECT, "public", "formulario-derivacion-en.pdf")

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
                       "Dr. Susana Vighi Pathology Center · Concepción Arenal 3732, Buenos Aires · (5411) 4551-7752")
    canvas.drawRightString(doc.pagesize[0] - 16 * mm, 10 * mm, f"Page {canvas.getPageNumber()}")
    canvas.restoreState()


doc = BaseDocTemplate(OUT_PATH, pagesize=A4,
                       leftMargin=16 * mm, rightMargin=16 * mm,
                       topMargin=5 * mm, bottomMargin=16 * mm)
frame = Frame(16 * mm, 16 * mm, doc.pagesize[0] - 32 * mm, doc.pagesize[1] - 21 * mm, id="f")
doc.addPageTemplates([PageTemplate(id="Form", frames=[frame], onPage=inner_page)])

CW = doc.pagesize[0] - 32 * mm
story = []


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
    Paragraph("Sample Referral Form", styles["FormTitle"]),
    Paragraph("CAP VIGHI", styles["FormSubtitle"]),
]
header = Table([[logo, header_text,
                  Paragraph(f"Form CAP-FD · Rev. {date.today().strftime('%m/%Y')}", styles["FormMeta"])]],
                colWidths=[17 * mm, CW - 17 * mm - 45 * mm, 45 * mm])
header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
]))
story.append(header)
story.append(Spacer(1, 1))
story.append(Paragraph(
    "Please print clearly in block letters.",
    styles["Small"],
))
story.append(Spacer(1, 3))

# ============================================================ 1. PATIENT
story.append(section_header(1, "Patient information"))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Full name", 0.5),
    ("ID number", 0.25),
    ("Date of birth", 0.25),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Sex", 1 / 3),
    ("Insurer / HMO", 1 / 3),
    ("Member ID", 1 / 3),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Contact phone", 0.5),
    ("Contact email", 0.5),
], height=6.5 * mm))
story.append(Spacer(1, 6))

# ============================================================ 2. PHYSICIAN
story.append(section_header(2, "Referring physician and institution"))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Referring physician", 0.45),
    ("License number", 0.25),
    ("Referring institution", 0.3),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Phone", 0.33),
    ("Email for report", 0.67),
], height=6.5 * mm))
story.append(Spacer(1, 6))

# ============================================================ 3. SAMPLE
story.append(section_header(3, "Sample information",
             "Complete one row per sample submitted."))
story.append(Spacer(1, 4))
sample_header = ["No.", "Sample type / anatomical site", "Collection date & time", "Containers", "Fixative", "Procedure"]
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

# ============================================================ 4. CLINICAL
story.append(section_header(4, "Clinical information"))
story.append(Spacer(1, 4))
story.append(Paragraph("PRESUMPTIVE DIAGNOSIS / RELEVANT CLINICAL HISTORY", styles["FieldLabel"]))
story.append(Spacer(1, 3))
story.append(blank_box(16 * mm))
story.append(Spacer(1, 4))
story.append(field_row([
    ("Relevant prior studies", 0.6),
    ("LMP / hormone therapy (if applicable)", 0.4),
], height=6.5 * mm))
story.append(Spacer(1, 4))
story.append(checkbox("Urgent / STAT study — coordinated in advance with the laboratory"))
story.append(Spacer(1, 6))

# ============================================================ 5. STUDY REQUESTED
section5_head = section_header(5, "Study requested")
half = CW / 2 - 2 * mm
col_left = Table([
    [checkbox("Routine histopathology")],
    [Spacer(1, 4)],
    [checkbox("Molecular biology")],
    [Spacer(1, 4)],
    [checkbox("Intraoperative frozen section")],
], colWidths=[half])
col_right = Table([
    [checkbox("Immunohistochemistry — markers:")],
    [Spacer(1, 3)],
    [field_row([("", 1.0)], height=6 * mm, total_width=half - 4 * mm)],
    [Spacer(1, 4)],
    [checkbox("Second opinion")],
], colWidths=[half])
two_col = Table([[col_left, col_right]], colWidths=[half, half])
two_col.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
]))
story.append(KeepTogether([section5_head, Spacer(1, 4), two_col]))
story.append(Spacer(1, 6))

# ============================================================ 6. SIGNATURE
story.append(section_header(6, "Signature and consent"))
story.append(Spacer(1, 4))
story.append(Paragraph(
    "I certify that the information provided is accurate and I authorize the processing of the "
    "personal data included herein in accordance with Argentina's Personal Data Protection Law "
    "No. 25,326, solely for the purpose of processing this study.",
    styles["ConsentText"],
))
story.append(Spacer(1, 3))
story.append(KeepTogether([field_row([
    ("Referring physician signature", 0.45),
    ("Printed name", 0.35),
    ("Date", 0.2),
], height=7 * mm)]))

doc.build(story)
print("OK ->", OUT_PATH)
