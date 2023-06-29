import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { addOutline, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import './List.css';
const List: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUSer, setSelectedUSer] = useState<any>(null);
  const userModal = useRef<HTMLIonModalElement>(null);
  const addUserModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [activeSegment, setActiveSegment] = useState<any>('details');

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useIonViewWillEnter(async () => {
    const users = await getUsers();
    setUsers(users);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const getUsers = async () => {
    const data = await fetch('https://randomuser.me/api/?results=20');
    const users = await data.json();
    return users.results;
  };

  const getUsername = (user: any) => {
    const { title, first, last } = user?.name || {};
    return title + ' ' + first + ' ' + last;
  };

  const reloadData = async (event: CustomEvent<RefresherEventDetail>) => {
    setLoading(true);
    const users = await getUsers();
    setUsers(users);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    event.detail.complete();
  };
  const clearList = () => {
    showAlert({
      header: 'Confirm',
      message: 'Are you sure you want to delete all the users?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            setUsers([]);

            showToast({
              message: 'All users deleted!',
              duration: 2000,
              color: 'danger',
            });
          },
          role: 'destructive',
        },
      ],
    });
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={clearList}>
              <IonIcon color='light' slot='icon-only' icon={trashBinOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color={'success'}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot='fixed' onIonRefresh={(ev) => reloadData(ev)}>
          <IonRefresherContent refreshingSpinner={'circles'} />
        </IonRefresher>
        {loading &&
          [...Array(20)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className='ion-no-padding'>
                <IonItem lines='none'>
                  <IonAvatar slot='start'>
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{ width: '40%' }} />
                    <p>
                      <IonSkeletonText animated />
                    </p>
                  </IonLabel>
                  <IonChip slot='end' color={'secondary'}>
                    <IonSkeletonText animated />
                  </IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

        {users?.map((user, index) => (
          <IonCard key={index} onClick={() => setSelectedUSer(user)}>
            <IonCardContent className='ion-no-padding'>
              <IonItem lines='none'>
                <IonAvatar slot='start'>
                  <IonImg src={user.picture.thumbnail}></IonImg>
                </IonAvatar>
                <IonLabel>
                  {getUsername(user)}
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip slot='end' color={'secondary'}>
                  {user.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
        <IonFab
          className='ion-margin-bottom ion-margin-end'
          slot='fixed'
          vertical='bottom'
          horizontal='end'
        >
          <IonFabButton id='add-new-user'>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        <IonModal
          breakpoints={[0, 0.5, 0.8]}
          initialBreakpoint={0.5}
          ref={userModal}
          isOpen={selectedUSer !== null}
          onIonModalDidDismiss={() => setSelectedUSer(null)}
        >
          <IonHeader>
            <IonToolbar color={'light'}>
              <IonButtons slot='start'>
                <IonButton onClick={() => userModal.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>{getUsername(selectedUSer)}</IonTitle>
            </IonToolbar>
            <IonToolbar color={'light'}>
              <IonSegment
                value={activeSegment}
                onIonChange={(e) => setActiveSegment(e.detail.value!)}
              >
                <IonSegmentButton value={'details'}>Details</IonSegmentButton>
                <IonSegmentButton value={'calendar'}>Calendar</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-text-center ion-padding'>
            {activeSegment === 'details' && <p>User detail</p>}
            {activeSegment === 'calendar' && <IonDatetime />}
          </IonContent>
        </IonModal>

        <IonModal
          ref={addUserModal}
          trigger='add-new-user'
          presentingElement={presentingElement!}
        >
          <IonHeader>
            <IonToolbar color={'success'}>
              <IonButtons slot='start'>
                <IonButton onClick={() => addUserModal.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>{'Add new User'}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-text-center'>
            <p>Adding a new user</p>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default List;
