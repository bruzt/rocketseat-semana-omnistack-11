import React from 'react';
import { Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as FeatherIcon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as MailComposer from 'expo-mail-composer';

import logo from '../assets/logo.png';

export default function Details() {

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const value = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso: "${incident.title}" com o valor de ${value}.`;

    function sendMail(){

        MailComposer.composeAsync({
            subject: `Héroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        });
    }

    async function sendWhatsapp(){

        try {
            
            await Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
            
        } catch (error) {
            Alert.alert('Erro', 'Whatsapp não encontrado nesse dispositivo');
        }
    }

    return (
        <ContainerView>

            <HeaderView>
                <LogoImage source={logo} />
                <BackButton onPress={() => navigation.goBack()}>
                    <FeatherIcon name='arrow-left' size={28} color='#e82041' />
                </BackButton>
            </HeaderView>

            <IncidentView>
                <IncidentPropertyText style={{ marginTop: 0 }}>ONG:</IncidentPropertyText>
                <IncidentValueText>{incident.name} de {incident.city}/{incident.uf}</IncidentValueText>

                <IncidentPropertyText>CASO:</IncidentPropertyText>
                <IncidentValueText>{incident.title}</IncidentValueText>

                <IncidentPropertyText>DESCRIÇÃO:</IncidentPropertyText>
                <IncidentValueText>{incident.description}</IncidentValueText>

                <IncidentPropertyText>VALOR:</IncidentPropertyText>
                <IncidentValueText>{value}</IncidentValueText>
            </IncidentView>

            <ContactView>
                <ContactTitleText>Salve o dia!</ContactTitleText>
                <ContactTitleText>Seja o herói desse caso.</ContactTitleText>
                <ContactDescriptionText>Entre em contato:</ContactDescriptionText>

                <ActionView>
                    <ActionButton onPress={sendWhatsapp}>
                        <ActionButtonText>Whatsapp</ActionButtonText>
                    </ActionButton>

                    <ActionButton onPress={sendMail}>
                        <ActionButtonText>email</ActionButtonText>
                    </ActionButton>
                </ActionView>
            </ContactView>


        </ContainerView>
    );
}

const ContainerView = styled.ScrollView`
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

const BackButton = styled.TouchableOpacity`

`;

const IncidentView = styled.View`
    padding: 24px;
    border-radius: 8px;
    background: #fff;
    margin: 48px 0 16px 0;
`;

const IncidentPropertyText = styled.Text`
    font-size: 14px;
    color: #41414d;
    font-weight: bold;
    margin: 24px 0 0 0;
`;

const IncidentValueText = styled.Text`
    margin: 8px 0 0 0;
    font-size: 15px;
    color: #737380;
`;

const ContactView = styled.View`
    padding: 24px;
    border-radius: 8px;
    background: #fff;
    margin: 0 0 50px 0;
`;

const ContactTitleText = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color: #13131a;
    line-height: 30px;
`;

const ContactDescriptionText = styled.Text`
    font-size: 15px;
    color: #737380;
    margin: 16px 0 0 0;
`;

const ActionView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 16px 0 0 0;
`;

const ActionButton = styled.TouchableOpacity`
    background: #e02041;
    border-radius: 8px;
    height: 50px;
    width: 48%;
    justify-content: center;
    align-items: center;
`;

const ActionButtonText = styled.Text`
    color: #fff;
    font-size: 15px;
    font-weight: bold;
`;
