import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';

import List from './List';
import Settings from './Setting';
import {
  homeOutline,
  logOutOutline,
  newspaperOutline,
  settings,
  settingsOutline,
} from 'ionicons/icons';
const Menu: React.FC = () => {
  const paths = [
    { name: 'List', url: '/app/list', icon: homeOutline },
    { name: 'Settings', url: '/app/settings', icon: settingsOutline },
    { name: 'Logout', url: '/', icon: logOutOutline, detail: false },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId='main'>
        <IonMenu contentId='main'>
          <IonHeader>
            <IonToolbar color={'success'}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  routerLink={item.url}
                  routerDirection='none'
                  detail={item?.detail}
                >
                  <IonIcon slot='start' icon={item.icon} />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id='main'>
          <Route exact path='/app/list' component={List} />
          <Route path='/app/settings' component={Settings} />
          <Route exact path='/app'>
            <Redirect to='/app/list' />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
