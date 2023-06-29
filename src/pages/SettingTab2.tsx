import {
  CreateAnimation,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useRef } from 'react';

const SettingTab2: React.FC = () => {
  const animationRef = useRef<CreateAnimation>(null);

  useIonViewDidEnter(() => {
    animationRef.current?.animation.play();
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <CreateAnimation
          ref={animationRef}
          duration={2000}
          iterations={Infinity}
          delay={1000}
          keyframes={[
            { offset: 0, transform: 'scale(0.8)', opacity: '1' },
            { offset: 0.5, transform: 'scale(1.2)', opacity: '0.5' },
            { offset: 1, transform: 'scale(1)', opacity: '1' },
          ]}
        >
          <IonButton expand='block' color={'success'} className='ion-margin'>
            Join Ionic Academy
          </IonButton>
        </CreateAnimation>
      </IonContent>
    </IonPage>
  );
};

export default SettingTab2;
