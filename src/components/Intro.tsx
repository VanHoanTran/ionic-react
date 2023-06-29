import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import Img1 from '../assets/cherries.png';
import Img2 from '../assets/orange.png';
import Img3 from '../assets/salad.png';
import { IonButton, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import './Intro.css';
interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return (
    <IonButton shape='round' onClick={() => swiper.slideNext()}>
      {children}
    </IonButton>
  );
};
const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <Swiper>
      <IonGrid>
        <SwiperSlide>
          <IonRow className='ion-justify-content-center'>
            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
              <img src={Img1} alt='Cherries' />
              <IonText>
                <h3>The expensive cherry in the world</h3>
                <SwiperButtonNext>Next</SwiperButtonNext>
              </IonText>
            </IonCol>
          </IonRow>
        </SwiperSlide>
        <SwiperSlide>
          <IonRow className='ion-justify-content-center'>
            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
              <img src={Img2} alt='orange' />
              <IonText>
                <h3>The sweetest orange you ever have</h3>
                <SwiperButtonNext>Next</SwiperButtonNext>
              </IonText>
            </IonCol>
          </IonRow>
        </SwiperSlide>
        <SwiperSlide>
          <IonRow className='ion-justify-content-center'>
            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
              <img src={Img3} alt='salad' />
              <IonText>
                <h3>The fresh salad will be served</h3>
                <IonButton onClick={() => onFinish()}>Finish</IonButton>
              </IonText>
            </IonCol>
          </IonRow>
        </SwiperSlide>
      </IonGrid>
    </Swiper>
  );
};

export default Intro;
