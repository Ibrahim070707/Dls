import React from 'react'
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function PdfDonwload() {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });

    // Create PDF component
    const MyPDF = () => (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text>Hello</Text>
                    <Text>Hello</Text>
                </View>
            </Page>
        </Document>
    );
    return (
        <div>
            <PDFDownloadLink document={<MyPDF />} fileName="my-pdf-document.pdf">
                {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
    )
}

export default PdfDonwload
