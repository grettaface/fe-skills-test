import ContxtSDK from '@ndustrial/contxt-sdk';

const contxtSDK = new ContxtSDK({
  config: {
    auth: {
      clientId: 'ge9BPBhkYhuJLA2MNv3H7ruHiM3ZWhSO',
      env: 'staging'
    }
  },
  sessionType: 'auth0WebAuth'
});

export default contxtSDK;
