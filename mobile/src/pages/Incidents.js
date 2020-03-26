import React, { useState, useEffect, Alert } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Feather as FeatherIcon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import api from '../services/api';

import logo from '../assets/logo.png';

export default function Incidents() {

    const navigation = useNavigation();

    const [incidentsState, setIncidents] = useState([]);
    const [totalState, setTotal] = useState(0);
    const [pageState, setPage] = useState(1);
    const [loadingState, setLoading] = useState(false);

    useEffect(() => {

        getIncidents();

    }, []);

    async function getIncidents(){

        if(loadingState) return;
        if(totalState > 0 && incidentsState.length === totalState) return;

        try {

            setLoading(true);
            const response = await api.get(`/incidents?page=${pageState}`);

            setTotal(response.headers['x-total-count']);
            setIncidents([ ...incidentsState, ...response.data ]);
            setPage(pageState + 1);
            setLoading(false);
            
        } catch (error) {
            Alert.alert('Erro', 'Erro oa carregar os casos, tente novamente');
        }
    }

    function navigateToDetails(incident){

        navigation.navigate('Details', { incident });
    }

    return (
        <ContainerView>
            
            <HeaderView>
                <LogoImage source={logo} />
                <HeaderText>Total de <HeaderBoldText>{totalState} casos.</HeaderBoldText></HeaderText>
            </HeaderView>

            <TitleText>Bem-vindo!</TitleText>
            <DescriptionText>Escolha um dos casos abaixo e salve o dia.</DescriptionText>

            <IncidentsFlatList 
                showsVerticalScrollIndicator={false}
                onEndReached={getIncidents}
                onEndReachedThreshold={0.2}
                data={incidentsState}
                keyExtractor={(incident, index) => String(index)}
                renderItem={({ item: incident }) => {
                    return (
                        <IncidentView>
                            <IncidentPropertyText>ONG:</IncidentPropertyText>
                            <IncidentValueText>{incident.name}</IncidentValueText>

                            <IncidentPropertyText>CASO:</IncidentPropertyText>
                            <IncidentValueText>{incident.title}</IncidentValueText>

                            <IncidentPropertyText>VALOR:</IncidentPropertyText>
                            <IncidentValueText>
                                {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                            </IncidentValueText>

                            <DetailsButton onPress={() => navigateToDetails(incident)}>
                                <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
                                <FeatherIcon name='arrow-right' size={16} color='#e02041' />
                            </DetailsButton>
                        </IncidentView>
                    );
                }}
            /> 

        </ContainerView>
    );
}

const ContainerView = styled.View`
    flex: 1;
    padding: 0 24px;
    padding-top: ${Constants.statusBarHeight + 20}px;
`;

const HeaderView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const LogoImage = styled.Image`

`;

const HeaderText = styled.Text`
    font-size: 15px;
    color: #737380;
`;

const HeaderBoldText = styled.Text`
    font-weight: bold;
`;

const TitleText = styled.Text`
    font-size: 30px;
    margin: 48px 0 16px 0;
    color: #13131a;
    font-weight: bold;
`;

const DescriptionText = styled.Text`
    font-size: 16px;
    line-height: 24px;
    color: #737380;
`;

const IncidentsFlatList = styled.FlatList`
    margin: 32px 0 0 0;
`;

const IncidentView = styled.View`
    padding: 24px;
    border-radius: 8px;
    background: #fff;
    margin: 0 0 16px 0;
`;

const IncidentPropertyText = styled.Text`
    font-size: 14px;
    color: #41414d;
    font-weight: bold;
`;

const IncidentValueText = styled.Text`
    margin: 8px 0 24px 0;
    font-size: 15px;
    color: #737380;
`;

const DetailsButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DetailsButtonText = styled.Text`
    color: #e02041;
    font-size: 15px;
    font-weight: bold;
`;