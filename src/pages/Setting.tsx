import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { square, triangle } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
import SettingTab1 from './SettingTab1';
import SettingTab2 from './SettingTab2';

const Settings: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='tab1' href='/app/settings/tab1'>
          <IonIcon icon={square} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab='tab2' href='/app/settings/tab2'>
          <IonIcon icon={triangle} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route path='/app/settings/tab1' component={SettingTab1} />
        <Route path='/app/settings/tab2' component={SettingTab2} />
        <Route exact path='/app/settings'>
          <Redirect to='/app/settings/tab1'></Redirect>
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Settings;
