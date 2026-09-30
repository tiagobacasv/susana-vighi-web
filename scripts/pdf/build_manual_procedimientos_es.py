# -*- coding: utf-8 -*-
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    NextPageTemplate, PageBreak, KeepTogether, Image as RLImage
)
from PIL import Image as PILImage

# ---- brand tokens (official palette, extracted from Brandbook VIGHI.pdf, p.7) ----
BLUE = HexColor("#440059")       # Color principal
ACCENT = HexColor("#572089")     # Color secundario
ACCENT_LIGHT = HexColor("#D39DED")  # Acento
ACCENT_PALE = HexColor("#ECD3F8")   # Acento (claro)
TEXT_BLACK = HexColor("#000000")    # Textos
PAPER = HexColor("#F1F1F1")      # Fondo secundario
BG_WHITE = HexColor("#FEFEFE")   # Fondo
SLATE = HexColor("#595959")      # neutral grey for de-emphasized copy (not in brandbook, kept unbranded on purpose)
LINE = HexColor("#E2DCE7")       # light tint derived from Fondo secundario for hairlines

# Repo root -- this script lives at <repo>/scripts/pdf/, so go up two levels.
PROJECT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOGO_WHITE_PATH = os.path.join(PROJECT, "src", "assets", "icon-white.png")
COBERTURAS_DIR = os.path.join(PROJECT, "src", "assets", "Coberturas")
# Documento aparte del sitio (no se publica en /public) -- se entrega directo, por eso
# se genera en el Escritorio en lugar de la carpeta de estáticos del sitio.
OUT_PATH = os.path.join(
    os.path.expanduser("~"),
    "OneDrive - Centro de diagnóstico Susana Vighi SRL",
    "Escritorio",
    "manual-procedimientos-derivantes.pdf",
)

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    name="Eyebrow", fontName="Helvetica-Bold", fontSize=9, tracking=1,
    textColor=ACCENT, spaceAfter=4, leading=11,
))
styles.add(ParagraphStyle(
    name="H1", fontName="Helvetica-Bold", fontSize=20, textColor=BLUE,
    spaceAfter=10, leading=24,
))
styles.add(ParagraphStyle(
    name="H2", fontName="Helvetica-Bold", fontSize=13, textColor=BLUE,
    spaceBefore=10, spaceAfter=6, leading=16,
))
styles.add(ParagraphStyle(
    name="H3", fontName="Helvetica-Bold", fontSize=11, textColor=BLUE,
    spaceBefore=2, spaceAfter=4, leading=14,
))
styles.add(ParagraphStyle(
    name="Body", fontName="Helvetica", fontSize=9.3, textColor=TEXT_BLACK,
    leading=13.5, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BodySlate", fontName="Helvetica", fontSize=9.3, textColor=SLATE,
    leading=13.5, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BulletItem", fontName="Helvetica", fontSize=9.1, textColor=TEXT_BLACK,
    leading=12.5, leftIndent=10, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="OrganCell", fontName="Helvetica", fontSize=7.6, textColor=TEXT_BLACK,
    leading=10.5,
))
styles.add(ParagraphStyle(
    name="CoverTitle", fontName="Helvetica-Bold", fontSize=27, textColor=BG_WHITE,
    leading=31, spaceAfter=10,
))
styles.add(ParagraphStyle(
    name="CoverSub", fontName="Helvetica", fontSize=12, textColor=ACCENT_PALE,
    leading=17,
))
styles.add(ParagraphStyle(
    name="CoverFooter", fontName="Helvetica", fontSize=8.5, textColor=ACCENT_LIGHT,
    leading=13,
))


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
    canvas.drawRightString(doc.pagesize[0] - 20 * mm, doc.pagesize[1] - 12 * mm, "MANUAL DE PROCEDIMIENTOS PARA INSTITUCIONES DERIVANTES")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(20 * mm, 14 * mm, doc.pagesize[0] - 20 * mm, 14 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawString(20 * mm, 10 * mm, "Centro de Anatomía Patológica Dra. Susana Vighi · Concepción Arenal 3732, CABA")
    canvas.drawRightString(doc.pagesize[0] - 20 * mm, 10 * mm, f"Página {doc.page - 1}")
    canvas.restoreState()


def bullet_list(items, style="BulletItem"):
    return [Paragraph(f'<font color="#572089">&#9679;</font>&nbsp;&nbsp;{it}', styles[style]) for it in items]


def step_card(n, title, text, width):
    # `text` puede ser un str o una lista de str (un párrafo por elemento, con aire entre ellos)
    blocks = [text] if isinstance(text, str) else list(text)
    body = []
    for i, block in enumerate(blocks):
        if i:
            body.append(Spacer(1, 5))
        body.append(Paragraph(block, styles["Body"]))
    data = [[
        Paragraph(f'<font color="#572089" size="16"><b>{n}</b></font>', styles["Body"]),
        [Paragraph(f'<b>{title}</b>', styles["H3"])] + body,
    ]]
    t = Table(data, colWidths=[14 * mm, width - 14 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), BG_WHITE),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
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
        data = [[requisito_card_content(*pair[0]), "", ""]]
        col_widths = [col_w, gap_w, col_w]
        box_cols = [0]
    t = Table(data, colWidths=col_widths)
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]
    for c in box_cols:
        style.append(("BOX", (c, 0), (c, 0), 0.7, LINE))
        style.append(("BACKGROUND", (c, 0), (c, 0), BG_WHITE))
    t.setStyle(TableStyle(style))
    return t


def callout(html, width, border=ACCENT, bg=ACCENT_PALE):
    data = [[Paragraph(html, styles["Body"])]]
    t = Table(data, colWidths=[width])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.7, border),
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t


def bullet_grid(items, n_cols, content_w, cell_style="OrganCell"):
    # Distribución tipo "índice de guía telefónica": columna por columna, no fila
    # por fila -- se lee de arriba hacia abajo en cada columna antes de saltar a la
    # siguiente, como el listado de órganos y el panel de IHQ.
    col_size = -(-len(items) // n_cols)  # ceil division
    columns = [items[i * col_size:(i + 1) * col_size] for i in range(n_cols)]
    n_rows = max((len(c) for c in columns), default=0)
    rows = []
    for r in range(n_rows):
        row = []
        for c in columns:
            text = c[r] if r < len(c) else ""
            row.append(Paragraph(f'<font color="#572089">&#9679;</font>&nbsp;{text}' if text else "", styles[cell_style]))
        rows.append(row)
    col_w = content_w / n_cols
    t = Table(rows, colWidths=[col_w] * n_cols)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2),
        ("LEFTPADDING", (0, 0), (-1, -1), 2),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def logo_card(path, box_w, box_h):
    with PILImage.open(path) as im:
        iw, ih = im.size
    pad = 6 * mm
    max_w, max_h = box_w - pad, box_h - pad
    scale = min(max_w / iw, max_h / ih)
    img = RLImage(path, width=iw * scale, height=ih * scale)
    t = Table([[img]], colWidths=[box_w], rowHeights=[box_h])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), BG_WHITE),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return t


def logo_grid(names_paths, n_cols, content_w, box_h):
    box_w = content_w / n_cols
    gap = 4 * mm
    card_w = box_w - gap
    rows = []
    row = []
    for name, path in names_paths:
        row.append(logo_card(path, card_w, box_h))
        if len(row) == n_cols:
            rows.append(row)
            row = []
    if row:
        while len(row) < n_cols:
            row.append("")
        rows.append(row)
    t = Table(rows, colWidths=[box_w] * n_cols, rowHeights=[box_h] * len(rows))
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), gap),
    ]))
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

# ============================================================ COVER ====
story.append(Spacer(1, 88 * mm))
story.append(Paragraph("Manual de<br/>Procedimientos", styles["CoverTitle"]))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "Guía de referencia para instituciones y médicos derivantes: alcance de estudios, "
    "requisitos preanalíticos, criterios de aceptación, trazabilidad y circuito completo "
    "de derivación con nuestro laboratorio.",
    styles["CoverSub"],
))
story.append(Spacer(1, 55 * mm))
story.append(Paragraph(
    "Centro de Anatomía Patológica Dra. Susana Vighi<br/>"
    "Concepción Arenal 3732, CABA · Argentina<br/>"
    "www.susanavighi.com.ar",
    styles["CoverFooter"],
))

story.append(NextPageTemplate("Inner"))
story.append(PageBreak())

# ============================================================ ALCANCE ====
story.append(Paragraph("ALCANCE DEL SERVICIO", styles["Eyebrow"]))
story.append(Paragraph("Estudios y órganos que procesamos", styles["H1"]))
story.append(Paragraph(
    "Nuestro laboratorio procesa anatomía patológica quirúrgica, citológica e "
    "intraoperatoria sobre el siguiente espectro de órganos y tejidos. Incluye también "
    "categorías de manejo especial (ganglio centinela, vaciamiento linfático, "
    "intraoperatoria/congelación y material remitido para segunda opinión).",
    styles["BodySlate"],
))
story.append(Spacer(1, 8))

organos = [
    "Abdomen", "Adenoides", "Amígdala", "Anexo", "Anexohisterectomía total", "Ano",
    "Apéndice", "Arteria", "Arteria Temporal", "Articulación", "Axila", "Bazo", "Boca",
    "Broncoaspiración", "Bronquio", "Cartílago", "Cavidad Oral", "Cerebro", "Colon",
    "Cuello", "Cuello Uterino", "Cuerdas Vocales", "Cuerpos Libres Intraarticulares",
    "Deferentes", "Discos Intervertebrales", "Duodeno", "Endometrio", "Epidídimo",
    "Epiplón", "Escroto", "Esófago", "Estómago", "Faringe", "Feto", "Ganglio",
    "Ganglio Axilar", "Ganglio Centinela", "Ganglio Linfático", "Ganglios", "Glande",
    "Glándula Parótida", "Glándula Submaxilar", "Glándula Tiroides",
    "Glándulas Paratiroides", "Glándulas Salivales", "Glándulas Sublingual", "Hígado",
    "Hipófisis", "Hueso", "Intestino", "Intestino Delgado", "Intraoperatoria", "Laringe",
    "Lengua", "Ligamentos", "Mama", "Mama Masculina", "Manguito Vaginal", "Mediastino",
    "Médula Ósea", "Mejilla", "Menisco", "Músculo", "Nariz", "Nervio", "Oído", "Ojo",
    "Ovario", "Páncreas", "Parametrios", "Pene", "Pericardio", "Peritoneo", "Piel",
    "Pleura", "Próstata", "Pulmón", "Recto", "Riñón", "Sinovial",
    "Sistema Pielocalicial", "Suprarrenales", "Taco en consulta (segunda opinión)",
    "Tejidos Blandos", "Testículo", "Timo", "Tráquea", "Trompa", "Uréter", "Uretra",
    "Útero", "Vaciamiento Linfático", "Vagina", "Válvula Aórtica", "Vejiga",
    "Vesícula", "Vesícula Seminal", "Vulva",
]

story.append(bullet_grid(organos, 4, CONTENT_W))
story.append(Spacer(1, 8))
story.append(Paragraph(
    "Ante una muestra o tipo de estudio que no figure en este listado, comunicate con "
    "nuestra coordinación médica antes de enviarla para confirmar si podemos procesarla.",
    styles["BodySlate"],
))

story.append(PageBreak())

# ============================================================ CIRCUITO ====
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
    ("03", "Envío o retiro", [
        '<font color="#572089" size="8"><b>DENTRO DE CABA Y GBA</b></font><br/>'
        "Retiro sin cargo, coordinando por teléfono.",
        '<font color="#572089" size="8"><b>ENVÍO DESDE EL INTERIOR &nbsp;·&nbsp; VÍA AÉREA</b></font><br/>'
        "Las muestras deben fijarse en formol Buffer al 15% durante 24hs. Luego puede vaciarse "
        "el líquido y solo remitir la muestra en su envase original bien cerrado y rotulado.",
    ]),
    ("04", "Recepción y trazabilidad", "Cada muestra recibe código único de trazabilidad. Reconciliamos contra el listado enviado por la institución derivante."),
]
for n, title, text in pasos:
    story.append(step_card(n, title, text, CONTENT_W))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# ============================================================ REQUISITOS ====
story.append(Paragraph("REQUISITOS POR TIPO DE ESTUDIO", styles["Eyebrow"]))
story.append(Paragraph("Preparación de la muestra", styles["H1"]))
story.append(Spacer(1, 8))

requisitos = [
    ("Biopsia por punción / endoscópica", [
        "Formol al 10% tamponado",
        "Rotulado con nombre y DNI",
        "Localización anatómica precisa",
    ]),
    ("Pieza quirúrgica", [
        "Fijación en formol 10% (volumen 10:1)",
    ]),
    ("Citología ginecológica (PAP)", [
        "Extendido en portaobjeto identificado",
        "Fijación con spray citológico o alcohol 96°",
        "Datos clínicos: FUM, terapia hormonal, antecedentes",
    ]),
    ("Punción con aguja fina (PAAF)", [
        "Extendidos secados al aire",
        "Material en medio líquido",
    ]),
    ("Biopsia intraoperatoria (congelación)", [
        "Coordinar previamente por mail a procedimientos@susanavighi.com.ar",
    ]),
]

gap_w = 6 * mm
col_w2 = (CONTENT_W - gap_w) / 2
for i in range(0, len(requisitos), 2):
    pair = requisitos[i:i + 2]
    story.append(requisito_row(pair, col_w2, gap_w))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# ============================================================ ACEPTACIÓN / RECHAZO ====
story.append(Paragraph("CRITERIOS DE ACEPTACIÓN", styles["Eyebrow"]))
story.append(Paragraph("Manejo preanalítico de la muestra", styles["H1"]))
story.append(Paragraph(
    "Antes de ingresar al procesamiento, cada muestra se revisa contra los siguientes "
    "criterios. Frente a cualquier observación, <b>nos comunicamos directamente con la "
    "institución derivante</b> para resolverlo — no aplicamos rechazo automático.",
    styles["Body"],
))
story.append(Spacer(1, 10))

criterios = [
    "Muestra sin fijar o fijada incorrectamente para el tipo de estudio solicitado",
    "Recipiente sin rotular, o con rotulado ilegible o incompleto (nombre y DNI del paciente)",
    "Demora en el traslado que compromete la integridad del tejido",
    "Cantidad de material insuficiente para el estudio solicitado",
    "Solicitud sin datos clínicos mínimos (diagnóstico presuntivo, localización, profesional derivante)",
]
story.append(Table(
    [[p] for p in bullet_list(criterios)],
    colWidths=[CONTENT_W],
    style=TableStyle([("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]),
))
story.append(Spacer(1, 10))
story.append(callout(
    '<font color="#572089"><b>PROTOCOLO ANTE UNA OBSERVACIÓN&nbsp;&nbsp;&#8212;&nbsp;&nbsp;</b></font>'
    "Contactamos al centro derivante para subsanar el inconveniente (dato faltante, "
    "nueva rotulación, ampliación de la solicitud) antes de continuar con el procesamiento.",
    CONTENT_W,
))

story.append(PageBreak())

# ============================================================ TRANSPORTE ====
story.append(Paragraph("ACONDICIONAMIENTO Y TRANSPORTE", styles["Eyebrow"]))
story.append(Paragraph("Cómo enviarnos una muestra", styles["H1"]))
story.append(Spacer(1, 8))

story.append(step_card("A", "CABA y Gran Buenos Aires", "Retiro sin cargo coordinando previamente por teléfono con nuestra coordinación médica.", CONTENT_W))
story.append(Spacer(1, 6))
story.append(step_card(
    "B", "Interior del país",
    "<b>Envío vía aérea.</b> Las muestras deben fijarse en formol Buffer al 15% durante 24hs. "
    "Luego puede vaciarse el líquido y remitirse solo la muestra en su envase original, "
    "bien cerrado y rotulado.",
    CONTENT_W,
))
story.append(Spacer(1, 10))
story.append(Paragraph(
    "En todos los casos: recipiente hermético, rotulado con nombre y DNI del paciente.",
    styles["BodySlate"],
))

story.append(Paragraph("Conservación y envío según tipo de material", styles["H2"]))
story.append(Spacer(1, 2))

conservacion = [
    ("Biopsias o piezas fijadas en formol", [
        "Temperatura ambiente",
        "Sin limitación en el tiempo de envío",
    ]),
    ("Aspirado de médula ósea para citometría de flujo", [
        "Temperatura ambiente",
        "<b>No refrigerar</b>",
    ]),
    ("Material en fresco para citometría de flujo", [
        "En solución fisiológica",
        "Refrigeración helada (tiempo prudencial: no más de 24 hs)",
        "Si no hay heladera: frasco dentro de un telgopor con hielos (no hielo seco, no congelar)",
        "Se aconseja avisar con anterioridad y coordinar con secretaría",
    ]),
    ("Material para inmunofluorescencia", [
        "Biopsias renales, de piel y de conjuntiva",
        "Refrigeración helada (tiempo prudencial: no más de 24 hs)",
        "Si no hay heladera: frasco dentro de un telgopor con hielos (no congelar)",
        "Se aconseja avisar con anterioridad y coordinar con secretaría",
    ]),
]
for i in range(0, len(conservacion), 2):
    story.append(requisito_row(conservacion[i:i + 2], col_w2, gap_w))
    story.append(Spacer(1, 6))

story.append(Spacer(1, 4))
story.append(callout(
    '<font color="#572089"><b>NOTA&nbsp;&nbsp;&#8212;&nbsp;&nbsp;</b></font>'
    "Todo material debe ser remitido con su orden médica respectiva, que contenga datos "
    "filiatorios del paciente, diagnóstico presuntivo y demás datos pertinentes, firma, "
    "sello y datos de contacto del profesional.",
    CONTENT_W,
))

story.append(PageBreak())

# ============================================================ TRAZABILIDAD ====
story.append(Paragraph("TRAZABILIDAD", styles["Eyebrow"]))
story.append(Paragraph("Confirmación de recepción y seguimiento", styles["H1"]))
story.append(Paragraph(
    "No emitimos una confirmación individual por cada muestra. Trabajamos por "
    "<b>reconciliación contra los listados</b> que cada institución derivante nos envía: "
    "si una muestra listada no llega, nos comunicamos de inmediato con el centro derivante.",
    styles["Body"],
))
story.append(Spacer(1, 10))

story.append(Paragraph("Estados del protocolo en nuestro sistema", styles["H2"]))
etapas = ["Recepción", "Procesamiento", "Informe", "Entrega"]
etapa_row = [Paragraph(f'<font color="#572089"><b>{i+1:02d}</b></font>&nbsp;&nbsp;{e}', styles["Body"]) for i, e in enumerate(etapas)]
etapa_t = Table([etapa_row], colWidths=[CONTENT_W / len(etapas)] * len(etapas))
etapa_t.setStyle(TableStyle([
    ("BOX", (0, 0), (-1, -1), 0.7, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
    ("BACKGROUND", (0, 0), (-1, -1), BG_WHITE),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ("LEFTPADDING", (0, 0), (-1, -1), 6),
]))
story.append(etapa_t)
story.append(Spacer(1, 10))

story.append(Paragraph("Semáforo de estado", styles["H2"]))
semaforo_data = [["OT · On Time", "DY · Delayed", "LT · Late"], ["En término", "Demorado", "Atrasado"]]
semaforo_t = Table(semaforo_data, colWidths=[CONTENT_W / 3] * 3)
semaforo_t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), ACCENT_PALE),
    ("BACKGROUND", (1, 0), (1, 0), PAPER),
    ("BACKGROUND", (2, 0), (2, 0), HexColor("#E8C9C9")),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTNAME", (0, 1), (-1, 1), "Helvetica"),
    ("FONTSIZE", (0, 0), (-1, -1), 9.3),
    ("TEXTCOLOR", (0, 0), (-1, 0), BLUE),
    ("TEXTCOLOR", (0, 1), (-1, 1), SLATE),
    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ("GRID", (0, 0), (-1, -1), 0.6, LINE),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
]))
story.append(semaforo_t)
story.append(Spacer(1, 10))
story.append(Paragraph(
    "Médicos e instituciones con usuario asignado pueden ingresar a nuestro sistema de "
    "gestión para consultar el estado de sus derivaciones y descargar los informes de sus "
    "pacientes. El usuario se solicita por email a nuestra coordinación médica.",
    styles["BodySlate"],
))

story.append(PageBreak())

# ============================================================ TIEMPOS ====
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
    "requerir plazos adicionales.",
    styles["BodySlate"],
))

story.append(PageBreak())

# ============================================================ PACIENTE / SEGUNDA OPINIÓN / DATOS ====
story.append(Paragraph("INFORMACIÓN COMPLEMENTARIA", styles["Eyebrow"]))
story.append(Paragraph("Paciente, segunda opinión y protección de datos", styles["H1"]))
story.append(Spacer(1, 8))

story.append(KeepTogether([
    Paragraph("Indicaciones para el paciente", styles["H2"]),
    Paragraph(
        "Al momento del estudio, el paciente debe presentar: orden médica original, DNI y "
        "la credencial de su obra social o prepaga si corresponde. Si ya tiene estudios "
        "previos relacionados, sugerimos traerlos también.",
        styles["Body"],
    ),
]))
story.append(Spacer(1, 8))

story.append(KeepTogether([
    Paragraph("Segunda opinión / material ya procesado", styles["H2"]),
    Paragraph(
        "Recibimos consultas y segundas opiniones sobre material ya procesado en otro "
        "laboratorio. Deben remitirse los tacos de parafina y los preparados originales, "
        "junto con el informe previo.",
        styles["Body"],
    ),
]))
story.append(Spacer(1, 8))

story.append(KeepTogether([
    Paragraph("Retención de material y copias de informes", styles["H2"]),
    Paragraph(
        "Conservamos los preparados y tacos de parafina por los plazos que exige la "
        "normativa vigente. Puede solicitarse una copia del informe o el material original "
        "acreditando identidad, aun años después del estudio.",
        styles["Body"],
    ),
]))
story.append(Spacer(1, 8))

story.append(KeepTogether([
    Paragraph("Protección de datos", styles["H2"]),
    Paragraph(
        "Trabajamos bajo la Ley 25.326 de Protección de Datos Personales. La información "
        "clínica de cada paciente es confidencial y solo se comparte con el paciente y su "
        "médico tratante.",
        styles["Body"],
    ),
]))

story.append(PageBreak())

# ============================================================ COBERTURAS ====
story.append(Paragraph("COBERTURAS", styles["Eyebrow"]))
story.append(Paragraph("Obras sociales y prepagas", styles["H1"]))
story.append(Paragraph(
    "Trabajamos en forma directa con las siguientes obras sociales y prepagas. Consultá "
    "por autorizaciones y modalidad de cobertura para cada estudio antes de derivar la muestra.",
    styles["BodySlate"],
))
story.append(Spacer(1, 10))

coberturas = [
    ("OSDE", "osde_logo.png"),
    ("Medicus", "logo-medicus.jpg"),
    ("Swiss Medical Group", "smg_logo.png"),
    ("Luis Pasteur", "logo_luis_pasteur.png"),
    ("Unión Personal", "logo-up.png"),
    ("Omint", "logo-omint.png"),
    ("OSPJN", "os-poder-judicial-destaque.png"),
    ("Centro Médico Pueyrredón", "logo-cmpueyrredon.jpg"),
    ("OSPOCE", "logoOspoce.png"),
    ("William Hope", "william-hope.png"),
    ("OSDIPP", "osdipp_logo.png"),
    ("SanCor Salud", "sancor-salud.png"),
    ("APSOT", "logo-apsot.png"),
    ("OSPIC", "ospic-300x126.png"),
    ("OSETYA", "osetya.png"),
]
coberturas_paths = [(name, os.path.join(COBERTURAS_DIR, fname)) for name, fname in coberturas]
story.append(logo_grid(coberturas_paths, 3, CONTENT_W, box_h=26 * mm))

story.append(PageBreak())

# ============================================================ PANEL IHQ ====
# Lista curada a partir del listado interno del laboratorio: se sacaron duplicados
# (mismo marcador con otro nombre/typo, o sufijos "(copia)") y entradas que no son
# marcadores sino códigos de facturación/cantidad ("Hasta N Anticuerpos", "(Panel)",
# "(AMEBPBA)", etc.). Confirmado con el laboratorio antes de sacar cada uno.
marcadores = [
    "1p19q", "1p19q por FISH", "ACTH", "Actina Muscular Específica", "Actina Músculo Liso",
    "ALFA ACTININA", "ALFA-FETOPROTEINA", "ALK (D5F3)", "Amilo-P", "Amiloide", "Amiloide AA",
    "Amiloide TTR", "ANEXINA A1", "Antígeno Común Leucocitario (ACL)",
    "Antígeno Prostático Específico (PSA)", "Arginasa-1", "ATRX", "BAP1", "BCL-2", "BCL-6",
    "BCL2 por FISH", "BCL6 por FISH", "BCOR", "Ber-ep4", "Beta-Catenina", "Biología molecular",
    "BOB1", "BRAF", "C-MET", "C-MYC", "C-MYC por FISH", "C4D", "CA 19-9", "CA125", "CAIX",
    "CALCITONINA", "CALDESMON", "CALPONINA", "CALRETININA", "CD10", "CD117", "CD138", "CD14",
    "CD15", "CD16", "CD163", "CD19", "CD1A", "CD2", "CD20", "CD207", "CD21", "CD23", "CD25",
    "CD3", "CD30", "CD31", "CD33", "CD34", "CD35", "CD38", "CD4", "CD41", "CD43", "CD45",
    "CD45RO", "CD5", "CD56", "CD57", "CD61", "CD68", "CD7", "CD71", "CD79a", "CD8", "CD99",
    "CDK4", "CDKN2A por FISH", "CDX2", "CEA", "CICLINA D1", "CISH/SISH", "Citometría de Flujo",
    "CK 18", "CK34 BE 12", "CK903", "CLAUDINA 1", "CLDN18", "CMV", "COX2", "CROMOGRANINA",
    "D2-40", "DESMINA", "Detección de HPV", "Detección de HPV16 HPV18", "DOG1", "DPC4", "EBER",
    "EBV", "ECADHERINA", "EGFR", "EMA", "Enzimas musculares", "ERG", "Estrogeno & Progesterona",
    "Estudio Citogenético", "Factor XIIIA", "FISH", "FLI-1", "FLT3", "Fosfasa ácida prostática (PAP)",
    "FSH", "GATA 3", "GCDFP15", "GFAP", "GH", "Glicoforina A", "Glutamina sintetasa", "Glypican",
    "Glypican 3", "Granzima", "Granzima B", "H3", "H3K27m3", "HCG", "Hepatocyte", "Her2Neu",
    "Her2Neu por FISH", "HGAL", "HHF35", "HHV8", "HMB45", "IDH1", "IgA", "IgD", "IgG", "IgG4",
    "IgM", "IMP-3", "Inestabilidad Microsatelital", "INHIBINA", "INI-1",
    "Inmunofluorescencia", "Inmunofluorescencia (Conjuntiva)", "Inmunofluorescencia (Renal)",
    "INSM1", "KAPPA", "KERATINA (AE1-AE3)", "KERATINA 14", "KERATINA 19", "KERATINA 20",
    "KERATINA 4", "KERATINA 5", "KERATINA 5/6", "KERATINA 7", "KERATINA 8", "KERATINA 8/18",
    "KERATINA HMW", "Ki 67", "KRAS", "LAMBDA", "Langerina", "LEF1", "LH", "LISOZINA", "LMP1",
    "MAMOGLOBINA", "Maspina", "MDM2", "MELAN-A", "MGMT", "Microscopia electrónica",
    "Mieloperoxidasa", "MIOGENINA", "MITF", "MLH1", "MOC 31", "MSH2", "MSH6", "MUC1", "MUC4",
    "MUC6", "MUM-1", "Myo D1", "NAPSINA A", "Nefropatología (Panel)", "Neurofilamento",
    "NKX 2.2", "NKX 3.1", "NRAS", "NSE", "NUT", "OCT 3/4", "OCT2", "Olig-2", "P16", "P40",
    "P504S", "P53", "P63", "P65", "pan-TRK", "Panel BRCA 1 y 2", "Panel de Endometrio",
    "Panel de Hipófisis", "Panel de HRR", "Panel de Mama", "Panqueratina",
    "Paratohormona (PTH)", "PAX-5", "PAX-8", "PCR VIRUS JC", "PD1", "PDL-1", "PDL-1 CPS",
    "PGM1", "PLA2R", "PLAP", "PMS2", "PODOPLANINA", "POLE", "PRAME", "PROLACTINA", "PTEN",
    "RB", "Receptor de Folato Alfa (FORL1)", "Receptores de Andrógenos",
    "Receptores de Estrógeno", "Receptores de Progesterona", "ROS1", "S-100", "SALL4",
    "SATB2", "SINAPTOFISINA", "SOX-10", "SOX-11", "SOX-9", "STAT-2", "STAT-6", "SV40",
    "TCL1", "TCR-Alfa", "TCR-Delta", "TDT", "TFE3 NUCLEAR", "TIA-1", "TIROGLOBULINA",
    "TIROTROPINA", "TLE-1", "Triptasa", "TTF1", "UROPLAQUINA", "VIMENTINA", "WT-1",
]

story.append(Paragraph("ALCANCE DEL SERVICIO", styles["Eyebrow"]))
story.append(Paragraph("Panel de inmunohistoquímica disponible", styles["H1"]))
story.append(Paragraph(
    "Marcadores y técnicas de inmunohistoquímica, biología molecular y estudios especiales "
    "que realizamos en nuestro laboratorio, sujetos a disponibilidad de material y "
    "validación del panel según el caso.",
    styles["BodySlate"],
))
story.append(Spacer(1, 8))
story.append(callout(
    '<font color="#572089"><b>IMPORTANTE&nbsp;&nbsp;&#8212;&nbsp;&nbsp;</b></font>'
    "Todos los marcadores están sujetos a autorización y/o presupuesto de la cobertura del "
    "paciente derivante. Confirmá disponibilidad con nuestra coordinación médica antes de "
    "solicitar el estudio.",
    CONTENT_W,
))
story.append(Spacer(1, 10))

MID = len(marcadores) // 2 + 6  # primera tanda un poco más grande para equilibrar ambas páginas
story.append(bullet_grid(marcadores[:MID], 4, CONTENT_W))

story.append(PageBreak())

story.append(Paragraph("ALCANCE DEL SERVICIO", styles["Eyebrow"]))
story.append(Paragraph("Panel de inmunohistoquímica (continuación)", styles["H1"]))
story.append(Spacer(1, 8))
story.append(bullet_grid(marcadores[MID:], 4, CONTENT_W))

story.append(PageBreak())

# ============================================================ CONTACTO ====
story.append(Paragraph("COORDINACIÓN MÉDICA", styles["Eyebrow"]))
story.append(Paragraph("Hablemos directamente", styles["H1"]))
story.append(Spacer(1, 8))

contact_rows = [
    ["Líneas rotativas", "(5411) 4551-7752 · (5411) 4551-7267 · (5411) 2035-9667"],
    ["Coordinación de derivaciones", "anatomia.patologica@susanavighi.com.ar"],
    ["Solicitud de servicio / usuario del sistema", "solicituddeservicio@susanavighi.com.ar"],
    ["Consultas sobre informes ya entregados", "anatomia.patologica@susanavighi.com.ar"],
    ["Dirección", "Concepción Arenal 3732, Ciudad Autónoma de Buenos Aires, C1427EKH"],
    ["Horario de atención", "Lunes a viernes de 08:00 a 20:00 hs"],
]
contact_t = Table(contact_rows, colWidths=[CONTENT_W * 0.4, CONTENT_W * 0.6])
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
    "Este manual resume los procedimientos vigentes del Centro de Anatomía Patológica "
    "Dra. Susana Vighi para instituciones y médicos derivantes. Ante cambios de protocolo, "
    "la versión más reciente prevalece sobre copias impresas anteriores.",
    styles["BodySlate"],
))

doc.build(story)
print("OK ->", OUT_PATH)
