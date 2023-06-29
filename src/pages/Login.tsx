import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  useIonRouter,
  useIonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {
  logInOutline,
  newspaperOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import Image from '../assets/Lilo-and-Stitch-SVG-hsmjfh.svg';
import Intro from '../components/Intro';

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();
  // it will be executed when this page being loaded
  useEffect(() => {
    const checkStorage = async () => {
      const { value } = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(value === 'true');
    };
    checkStorage();
  }, []);

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({
      key: INTRO_KEY,
      value: 'true',
    });
  };

  const seeIntroAgain = async () => {
    setIntroSeen(false);
    Preferences.remove({
      key: INTRO_KEY,
    });
  };

  const loginHandler = async (event: any) => {
    event.preventDefault();
    present('Logging in...');
    setTimeout(async () => {
      dismiss();
      router.push('/app', 'root');
    }, 1000);
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={'success'}>
              <IonTitle color={'primary'}>Login Page</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent scrollY={false} className='ion-padding'>
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
                      <form onSubmit={loginHandler}>
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
                            expand='block'
                          >
                            <IonIcon icon={logInOutline} slot='start'></IonIcon>
                            Login
                          </IonButton>

                          <IonButton
                            className='ion-margin-top'
                            type='button'
                            color='secondary'
                            routerLink='/register'
                            expand='block'
                          >
                            <IonIcon
                              icon={personCircleOutline}
                              slot='start'
                            ></IonIcon>
                            Create Account
                          </IonButton>

                          <IonButton
                            className='ion-margin-top'
                            type='button'
                            color='medium'
                            expand='block'
                            size='small'
                            fill='clear'
                            onClick={seeIntroAgain}
                          >
                            <IonIcon
                              icon={newspaperOutline}
                              slot='start'
                            ></IonIcon>
                            Watch Intro Again
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
      )}
    </>
  );
};

export default Login;
