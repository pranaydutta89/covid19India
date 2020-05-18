import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
const commonTitle = 'Latest Covid19 India Outbreak Data';
const metaInfos = {
  '/': {
    title: `${commonTitle} | Districts Patient Counts,Essentials,Patients. Location based data`,
    description: `Get latest India districts cities active, recovered, deaths, confirmed covid19 patients count, get covid19 sarc-cov-2 counts based on your current location city or district, get realtime push notification for your district or city, get district or city essentials address and helpline contact number`,
    keywords:
      'Covid19,sarc-cov-2,location based info,covid19 city patient count,covid19 district patient count,push nofiication',
  },
  '/states': {
    title: `${commonTitle} | State Patient Counts,Essentials. Location based data`,
    description: `Get latest India states active, recovered, deaths, confirmed covid19 patients count, get covid19 sarc-cov-2 counts based on your current location state, get realtime push notification for your state, get state essentials address and helpline contact number`,
    keywords:
      'Covid19,sarc-cov-2,location based info,covid19 state patient count,push nofiication',
  },
  '/watched': {
    title: `${commonTitle} | Watched districts/states`,
    description: `See your watched districts and states data for covid19 sarc-cov-2 so that you dont have to search again from entire list of districts or state`,
    keywords: `watch state for covid19,watch city for covid 19, watch district for covid 19`,
  },
  '/about': {
    title: `${commonTitle} | About`,
    description: `Covid2.in provides you with updated covid19/SARC-Cov-2 infection
              outbreak data of India, over here you can get information related
              to every states and district of India, starting from what are the
              active patients to number of deaths to essentials near you.We
              also provide you data related to your location and also real time
              updates using push notification.`,
    keywords: '',
  },
  '/india': {
    title: 'Covid19 India: Districts Data',
    description: `Get latest covid19 sarc-cov-2 outbreak data for India, get confirmed, deaths ,recovered, active cases count for India, get number of test India did till date, get previous date confirmed, recovered ,deaths cases counts`,
    keywords: 'Covid19 India,sarc-cov-2 India',
  },
};

export default class MetaComponent extends PureComponent {
  render() {
    const { route } = this.props;
    const info = metaInfos[route];
    return (
      <Helmet>
        <title>{info.title}</title>
        <meta name="keywords" content={info.keywords} />
        <meta name="description" content={info.description} />
        <meta property="og:description" content={info.description} />
        <meta property="og:url" content={`https://covid2.in${route}`} />
        <meta property="og:title" content={info.title} />
        <meta name="twitter:title" content={info.title} />
        <meta name="twitter:description" content={info.description} />
        <meta name="robots" content="index, follow" />
      </Helmet>
    );
  }
}
