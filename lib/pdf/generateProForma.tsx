import { Document, Page, View, Text, Svg, Path, Circle, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { siteConfig } from "@/config/site.config";
import type { OrderRequestCustomer, OrderRequestLineItem, OrderRequestTotals } from "@/types/order";

export interface ProFormaData {
  invoiceNumber: string;
  date: string;
  customer: OrderRequestCustomer;
  items: OrderRequestLineItem[];
  totals: OrderRequestTotals;
  currency: string;
  paymentTerms: string;
}

const INK = "#12131C";
const GOLD = "#5B4FE8";
const MUTED = "#6B6A75";
const LINE = "#E2E2E8";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: INK,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  companyBlock: { flexDirection: "row", alignItems: "center", gap: 8 },
  companyName: { fontFamily: "Helvetica-Bold", fontSize: 15 },
  companyMeta: { fontSize: 8, color: MUTED, marginTop: 2, lineHeight: 1.5 },
  invoiceTitle: { fontFamily: "Helvetica-Bold", fontSize: 13, textAlign: "right", color: INK },
  invoiceSub: { fontSize: 8, color: MUTED, textAlign: "right", marginTop: 4 },
  divider: { borderBottomWidth: 1, borderBottomColor: LINE, marginVertical: 14 },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  billTo: { fontSize: 9.5, lineHeight: 1.6 },
  table: { marginTop: 8 },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: INK,
    color: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 2,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  colSku: { width: "16%", fontSize: 8 },
  colName: { width: "32%", fontSize: 8.5 },
  colColor: { width: "14%", fontSize: 8 },
  colQty: { width: "12%", fontSize: 8, textAlign: "right" },
  colPrice: { width: "13%", fontSize: 8, textAlign: "right" },
  colSubtotal: { width: "13%", fontSize: 8.5, textAlign: "right", fontFamily: "Helvetica-Bold" },
  headerCell: { fontSize: 7.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 0.5 },
  totalsBlock: { marginTop: 16, alignSelf: "flex-end", width: 220 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  totalsLabel: { fontSize: 8.5, color: MUTED },
  totalsValue: { fontSize: 8.5 },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: INK,
  },
  grandTotalLabel: { fontSize: 11, fontFamily: "Helvetica-Bold" },
  grandTotalValue: { fontSize: 11, fontFamily: "Helvetica-Bold", color: GOLD },
  twoCol: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, gap: 24 },
  col: { width: "48%" },
  paymentLine: { fontSize: 8.5, lineHeight: 1.7 },
  terms: { fontSize: 7.5, color: MUTED, lineHeight: 1.6, marginTop: 20 },
  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 46 },
  signatureBox: { width: "40%" },
  signatureLine: { borderTopWidth: 1, borderTopColor: INK, marginTop: 30, paddingTop: 4 },
  signatureLabel: { fontSize: 7.5, color: MUTED },
  footerNote: { position: "absolute", bottom: 30, left: 40, right: 40, fontSize: 7, color: MUTED, textAlign: "center" },
});

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

function Logo() {
  return (
    <Svg width={26} height={26} viewBox="0 0 30 30">
      <Circle cx={15} cy={15} r={14.25} stroke={INK} strokeWidth={1} fill="none" />
      <Path
        d="M9 19.5c1.5-6 2.2-9.6 6-9.6 2.6 0 3 2.1 5.4 2.1 1.1 0 1.8-.4 2.4-1"
        stroke={GOLD}
        strokeWidth={1.2}
        fill="none"
      />
    </Svg>
  );
}

export function ProFormaDocument({ invoiceNumber, date, customer, items, totals, currency, paymentTerms }: ProFormaData) {
  const { company, banking, terms: configTerms } = siteConfig;

  return (
    <Document title={`Pro Forma Invoice ${invoiceNumber}`} author={company.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <View style={styles.companyBlock}>
              <Logo />
              <Text style={styles.companyName}>{company.name}</Text>
            </View>
            <Text style={styles.companyMeta}>
              {company.legalName}
              {"\n"}
              {company.address.line1}, {company.address.city} {company.address.postalCode}, {company.address.country}
              {"\n"}
              VAT {company.vatNumber} · {company.email}
            </Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>PRO FORMA INVOICE</Text>
            <Text style={styles.invoiceSub}>Quotation request — not a confirmed order</Text>
            <Text style={styles.invoiceSub}>No. {invoiceNumber}</Text>
            <Text style={styles.invoiceSub}>Date: {date}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Bill To</Text>
        <View style={styles.billTo}>
          <Text>{customer.companyName}</Text>
          <Text>{customer.contactName}</Text>
          <Text>
            {customer.shippingAddress}, {customer.city}, {customer.country}
          </Text>
          <Text>
            {customer.email} · {customer.phone}
          </Text>
          {customer.vatNumber ? <Text>VAT {customer.vatNumber}</Text> : null}
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colSku, styles.headerCell]}>SKU</Text>
            <Text style={[styles.colName, styles.headerCell]}>Product</Text>
            <Text style={[styles.colColor, styles.headerCell]}>Color</Text>
            <Text style={[styles.colQty, styles.headerCell]}>Pkg / Pairs</Text>
            <Text style={[styles.colPrice, styles.headerCell]}>Price</Text>
            <Text style={[styles.colSubtotal, styles.headerCell]}>Subtotal</Text>
          </View>
          {items.map((item) => (
            <View style={styles.tableRow} key={item.sku}>
              <Text style={styles.colSku}>{item.sku}</Text>
              <Text style={styles.colName}>{item.name}</Text>
              <Text style={styles.colColor}>{item.color}</Text>
              <Text style={styles.colQty}>
                {item.quantityPackages} / {item.pairs}
              </Text>
              <Text style={styles.colPrice}>{formatMoney(item.pricePerPackage, currency)}</Text>
              <Text style={styles.colSubtotal}>{formatMoney(item.subtotal, currency)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Total packages</Text>
            <Text style={styles.totalsValue}>{totals.totalPackages}</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Total pairs</Text>
            <Text style={styles.totalsValue}>{totals.totalPairs}</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.totalsValue}>{formatMoney(totals.subtotal, currency)}</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Estimated shipping</Text>
            <Text style={styles.totalsValue}>{formatMoney(totals.estimatedShipping, currency)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Grand Total</Text>
            <Text style={styles.grandTotalValue}>{formatMoney(totals.grandTotal, currency)}</Text>
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Payment Instructions</Text>
            <Text style={styles.paymentLine}>
              Bank: {banking.bankName}
              {"\n"}
              IBAN: {banking.iban}
              {"\n"}
              SWIFT/BIC: {banking.swiftBic}
              {"\n"}
              Account holder: {banking.accountHolder}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Payment Terms</Text>
            <Text style={styles.paymentLine}>{paymentTerms}</Text>
          </View>
        </View>

        <Text style={styles.terms}>{configTerms.termsAndConditions}</Text>

        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Authorized Signature — {company.name}</Text>
            </View>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Date</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footerNote}>
          {company.name} · {company.website} · {company.email} · {company.phone}
        </Text>
      </Page>
    </Document>
  );
}

export async function generateProForma(data: ProFormaData): Promise<Buffer> {
  return renderToBuffer(<ProFormaDocument {...data} />);
}
