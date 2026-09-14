# -*- coding: utf-8 -*-
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    NextPageTemplate, PageBreak,
)

# ---- brand tokens (official palette, extracted from Brandbook VIGHI.pdf, p.7) ----
BLUE = HexColor("#440059")
ACCENT = HexColor("#572089")
ACCENT_LIGHT = HexColor("#D39DED")
ACCENT_PALE = HexColor("#ECD3F8")
TEXT_BLACK = HexColor("#000000")
PAPER = HexColor("#F1F1F1")
BG_WHITE = HexColor("#FEFEFE")
SLATE = HexColor("#595959")
LINE = HexColor("#E2DCE7")

# Repo root -- this script lives at <repo>/scripts/pdf/, so go up two levels.
PROJECT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOGO_WHITE_PATH = os.path.join(PROJECT, "src", "assets", "icon-white.png")
OUT_PATH = os.path.join(PROJECT, "public", "instructivo-derivantes-en.pdf")

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(name="Eyebrow", fontName="Helvetica-Bold", fontSize=9, textColor=ACCENT, spaceAfter=4, leading=11))
styles.add(ParagraphStyle(name="H1", fontName="Helvetica-Bold", fontSize=22, textColor=BLUE, spaceAfter=10, leading=26))
styles.add(ParagraphStyle(name="H2", fontName="Helvetica-Bold", fontSize=15, textColor=BLUE, spaceBefore=4, spaceAfter=8, leading=18))
styles.add(ParagraphStyle(name="H3", fontName="Helvetica-Bold", fontSize=11, textColor=BLUE, spaceBefore=2, spaceAfter=4, leading=14))
styles.add(ParagraphStyle(name="Body", fontName="Helvetica", fontSize=9.5, textColor=TEXT_BLACK, leading=14, spaceAfter=4))
styles.add(ParagraphStyle(name="BodySlate", fontName="Helvetica", fontSize=9.5, textColor=SLATE, leading=14, spaceAfter=4))
styles.add(ParagraphStyle(name="BulletItem", fontName="Helvetica", fontSize=9.3, textColor=TEXT_BLACK, leading=13, leftIndent=10, spaceAfter=3, bulletIndent=0))
styles.add(ParagraphStyle(name="CoverTitle", fontName="Helvetica-Bold", fontSize=30, textColor=BG_WHITE, leading=34, spaceAfter=10))
styles.add(ParagraphStyle(name="CoverSub", fontName="Helvetica", fontSize=12, textColor=ACCENT_PALE, leading=17))
styles.add(ParagraphStyle(name="CoverFooter", fontName="Helvetica", fontSize=8.5, textColor=ACCENT_LIGHT, leading=13))


def cover_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BLUE)
    canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=1, stroke=0)
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
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(1.4)
    canvas.line(20 * mm, doc.pagesize[1] - 15 * mm, doc.pagesize[0] - 20 * mm, doc.pagesize[1] - 15 * mm)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(BLUE)
    canvas.drawString(20 * mm, doc.pagesize[1] - 12 * mm, "CAP VIGHI")
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawRightString(doc.pagesize[0] - 20 * mm, doc.pagesize[1] - 12 * mm, "GUIDE FOR REFERRING PHYSICIANS")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(20 * mm, 14 * mm, doc.pagesize[0] - 20 * mm, 14 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawString(20 * mm, 10 * mm, "Dr. Susana Vighi Pathology Center · Concepción Arenal 3732, Buenos Aires")
    canvas.drawRightString(doc.pagesize[0] - 20 * mm, 10 * mm, f"Page {doc.page - 1}")
    canvas.restoreState()


def bullet_list(items, style="BulletItem"):
    return [Paragraph(f'<font color="#572089">&#9679;</font>&nbsp;&nbsp;{it}', styles[style]) for it in items]


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
story.append(Paragraph("Guide for<br/>Referring Physicians", styles["CoverTitle"]))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "Fixation protocols, requirements by study type, turnaround times, and "
    "coordination with our anatomic pathology laboratory.",
    styles["CoverSub"],
))
story.append(Spacer(1, 60 * mm))
story.append(Paragraph(
    "Dr. Susana Vighi Pathology Center<br/>"
    "Concepción Arenal 3732, Buenos Aires · Argentina<br/>"
    "www.susanavighi.com.ar",
    styles["CoverFooter"],
))

story.append(NextPageTemplate("Inner"))
story.append(PageBreak())

# ---------------- WORKFLOW ----------------
story.append(Paragraph("REFERRAL WORKFLOW", styles["Eyebrow"]))
story.append(Paragraph("From collection to report", styles["H1"]))
story.append(Paragraph(
    "Four steps, designed to minimize delays and ensure full traceability "
    "of every sample received.",
    styles["BodySlate"],
))
story.append(Spacer(1, 10))

pasos = [
    ("01", "Request", "Fill out the form with patient data, presumptive diagnosis, prior studies, and the referring physician's details."),
    ("02", "Sample fixation", "10% buffered formalin at a 10:1 ratio to tissue volume. Container labeled with the patient's name and ID number."),
    ("03", "Shipping or pickup", "Free pickup within Buenos Aires City and Greater Buenos Aires, coordinated by phone. We also receive shipments from anywhere in the country."),
    ("04", "Receipt and traceability", "Each sample receives a unique tracking code, and a receipt confirmation is sent to the referring physician."),
]
for n, title, text in pasos:
    story.append(step_card(n, title, text, CONTENT_W))
    story.append(Spacer(1, 6))

story.append(Spacer(1, 6))
warn_data = [[Paragraph(
    '<font color="#572089"><b>IMPORTANT&nbsp;&nbsp;&#8212;&nbsp;&nbsp;</b></font>'
    "For any questions about fixation, transport, or turnaround times, contact our "
    "medical coordination team before sending the sample.",
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

# ---------------- REQUIREMENTS ----------------
story.append(Paragraph("REQUIREMENTS BY STUDY TYPE", styles["Eyebrow"]))
story.append(Paragraph("Sample preparation", styles["H1"]))
story.append(Spacer(1, 8))

requisitos = [
    ("Needle / endoscopic biopsy", [
        "10% buffered formalin",
        "Labeled with name and ID number",
        "Request form with precise anatomical location",
        "Attach endoscopy report if applicable",
    ]),
    ("Surgical specimen", [
        "Immediate fixation in 10% formalin (10:1 ratio)",
        "Do not section before shipping unless instructed",
        "Request form with complete clinical and surgical data",
        "Arrange pickup within 24 hours",
    ]),
    ("Gynecologic cytology (Pap smear)", [
        "Smear on a labeled slide",
        "Fixed with cytology spray or 96° alcohol",
        "Clinical data: LMP, hormone therapy, relevant history",
    ]),
    ("Fine-needle aspiration (FNA)", [
        "Air-dried smears (Diff-Quick) and fixed smears (Papanicolaou)",
        "Material in liquid medium for cell block if applicable",
        "Request form with location, size, and ultrasound findings",
    ]),
    ("Intraoperative (frozen section) biopsy", [
        "Coordinate in advance by phone",
        "Fresh, unfixed sample in a sterile container",
        "Immediate transport to the laboratory",
    ]),
    ("Molecular studies / complex IHC", [
        "Sample fixed in 10% formalin (minimum 6 h, maximum 48 h)",
        "Paraffin block with representative material",
        "Request form specifying required markers",
    ]),
]

gap_w = 6 * mm
col_w = (CONTENT_W - gap_w) / 2
for i in range(0, len(requisitos), 2):
    pair = requisitos[i:i + 2]
    story.append(requisito_row(pair, col_w, gap_w))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# ---------------- TURNAROUND ----------------
story.append(Paragraph("AVERAGE TURNAROUND TIME", styles["Eyebrow"]))
story.append(Paragraph("Business days from receipt", styles["H1"]))
story.append(Spacer(1, 8))

tiempos_data = [
    ["Study", "Estimated time"],
    ["Pap smear", "3 business days"],
    ["Biopsy", "6 business days"],
    ["Immunohistochemistry", "7 business days"],
    ["Biopsy with IHC", "9 business days"],
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
    "More complex studies (molecular biology, special techniques) may require "
    "additional time. Intraoperative (frozen section) biopsies are reported during the surgical procedure.",
    styles["BodySlate"],
))

story.append(PageBreak())

# ---------------- CONTACT ----------------
story.append(Paragraph("MEDICAL COORDINATION", styles["Eyebrow"]))
story.append(Paragraph("Let's talk directly", styles["H1"]))
story.append(Spacer(1, 8))

contact_rows = [
    ["Phone lines", "(5411) 4551-7752 · (5411) 4551-7267 · (5411) 2035-9667"],
    ["Referral coordination", "anatomia.patologica@susanavighi.com.ar"],
    ["Service requests", "solicituddeservicio@susanavighi.com.ar"],
    ["Address", "Concepción Arenal 3732, Buenos Aires, C1427EKH, Argentina"],
    ["Business hours", "Monday to Friday, 8:00 AM to 8:00 PM"],
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
    "This guide summarizes the information published at "
    "<font color='#572089'>susanavighi.com.ar/derivantes</font>. "
    "In the event of protocol changes, the version on the website takes precedence over printed copies.",
    styles["BodySlate"],
))

doc.build(story)
print("OK ->", OUT_PATH)
