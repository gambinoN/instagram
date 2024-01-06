/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
    const users = [
      {
        userId: 'GN6HcD5PjIhNybAoBpsXxxfv5mv2',
        username: 'nedim_gabela',
        fullName: 'Nedim Gabela',
        emailAddress: 'gabelanedim@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'seco_amir',
        fullName: 'Amir Secovic',
        emailAddress: 'seca@gmail.com',
        following: [],
        followers: ['GN6HcD5PjIhNybAoBpsXxxfv5mv2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'saban_ikanovic',
        fullName: 'Saban Ikanovic',
        emailAddress: 'aabanikanovic04@gmail.com',
        following: [],
        followers: ['GN6HcD5PjIhNybAoBpsXxxfv5mv2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'zundja_i',
        fullName: 'Imran Zundja',
        emailAddress: 'reactivemotives@gmail.com',
        following: [],
        followers: ['GN6HcD5PjIhNybAoBpsXxxfv5mv2'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/raphael/${i}.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'saban_ikanovic',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'zundja_i',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }