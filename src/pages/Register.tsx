import React from 'react';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonButtons,
  IonBackButton,
  useIonRouter,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import Image from '../assets/Lilo-and-Stitch-SVG-hsmjfh.svg';
import { checkmarkDoneOutline } from 'ionicons/icons';

const Register: React.FC = () => {
  const router = useIonRouter();

  const registerHandler = (event: any) => {
    event.preventDefault();
    console.log('registerHandler');
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle color={'primary'}>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <IonGrid>
          <IonRow className='ion-justify-content-center'>
            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
              <div className='ion-text-center ion-padding'>
                <img width={'50%'} src={Image} alt='random Image' />
              </div>
            </IonCol>
          </IonRow>
          <IonRow className='ion-justify-content-center'>
            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
              <IonCard>
                <IonCardContent>
                  <form onSubmit={registerHandler}>
                    <IonList>
                      <IonItem>
                        <IonInput
                          fill='outline'
                          labelPlacement='floating'
                          label='Email'
                          type='email'
                          placeholder='example@gmail.com'
                        ></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonInput
                          className='ion-margin-top'
                          fill='outline'
                          labelPlacement='floating'
                          type='password'
                          label='Password'
                          value='password'
                        ></IonInput>
                      </IonItem>

                      <IonButton
                        className='ion-margin-top'
                        type='submit'
                        color='secondary'
                        expand='block'
                      >
                        <IonIcon
                          icon={checkmarkDoneOutline}
                          slot='start'
                        ></IonIcon>
                        Create My Account
                      </IonButton>
                    </IonList>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
