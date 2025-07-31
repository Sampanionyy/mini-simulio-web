import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#1f2937', // gris foncé
        padding: 20,
        fontSize: 12,
        fontFamily: 'Helvetica',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        color: 'white', 
    },
    section: {
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#059669',
        borderBottomStyle: 'solid',
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
        alignItems: 'center',
    },
    label: {
        flex: 1,
        color: 'white',
        fontWeight: 'normal',
    },
    value: {
        color: '#34d399', // vert émeraude
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        fontSize: 10,
        textAlign: 'center',
        color: 'white',
    },
});

const SimulationPDFDocument = ({ simulation }) => {
    const today = new Date().toLocaleDateString('fr-FR');

    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Text style={styles.title}>Simulation #{simulation.id}</Text>
                    <View style={styles.section}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Prix du bien:</Text>
                            <Text style={styles.value}>{simulation.prix_bien} €</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Frais de notaire:</Text>
                            <Text style={styles.value}>{simulation.frais_notaire} €</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Garantie bancaire:</Text>
                            <Text style={styles.value}>{simulation.garantie_bancaire} €</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Frais d'agence:</Text>
                            <Text style={styles.value}>{simulation.frais_agence} €</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Apport:</Text>
                            <Text style={styles.value}>{simulation.apport} %</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Total à financer:</Text>
                            <Text style={styles.value}>{simulation.total_financer} €</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Taux d'intérêt:</Text>
                            <Text style={styles.value}>{simulation.taux_interet} %</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Taux assurance:</Text>
                            <Text style={styles.value}>{simulation.taux_assurance} %</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Assurance totale:</Text>
                            <Text style={styles.value}>{simulation.assurance_total} €</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Intérêts totaux:</Text>
                            <Text style={styles.value}>{simulation.interets_total} €</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Salaire minimum:</Text>
                            <Text style={styles.value}>{simulation.salaire_minimum} €</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Durée (années):</Text>
                            <Text style={styles.value}>{simulation.duree_annees}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date acquisition:</Text>
                            <Text style={styles.value}>
                                {new Date(simulation.date_acquisition).toLocaleDateString('fr-FR')}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Date financement:</Text>
                            <Text style={styles.value}>
                                {new Date(simulation.date_financement).toLocaleDateString('fr-FR')}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Revalorisation bien:</Text>
                            <Text style={styles.value}>{simulation.revalorisation_bien} %</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Travaux:</Text>
                            <Text style={styles.value}>{simulation.travaux} €</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text>Simulio</Text>
                    <Text>{today}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default SimulationPDFDocument;
