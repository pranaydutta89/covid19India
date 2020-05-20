import React, { PureComponent } from 'react';
import { Typography, Card, CardContent, Link } from '@material-ui/core';
export default class AboutComponent extends PureComponent {
  render() {
    return (
      <>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h1">
              What is covid2.in ?
            </Typography>
            <Typography variant="body2" component="p">
              Covid2.in provides you with updated covid19/SARC-Cov-2 infection
              outbreak data of India, over here you can get information related
              to every states and district of India, starting from what are the
              active patients to number of deaths to essentials near you. We
              also provide you data related to your location and also real time
              updates using push notification.
              <br />
              If you change your location then website will automatically check
              your location and update you about the infection essentials
              details of that particular location. You can also select specific
              district or state and put it in your watch list so that you don't
              have to search entire list of states or districts every time.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h1">
              How covid2.in is built?
            </Typography>
            <Typography variant="body2" component="p">
              Covid2.in fetches data from https://api.covid19india.org/ a crowd
              sourced api. After which if you allow with location and push
              notification permission then we try to show data based on your
              location as well sending your realtime updates of that speicific
              location.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h1">
              Why covid2.in ?
            </Typography>
            <Typography variant="body2" component="p">
              There are many websites having similar data but we thought of
              adding features like simplistic UI, relevant information
              ,information based on your location, push notification on your
              current location thats why we created this simple, light weighted
              portal.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h1">
              Social Links
            </Typography>
            <Typography variant="body2" component="p">
              <Link
                href="https://www.facebook.com/Covid2in-115889216767364"
                target="_blank"
              >
                Facebook Page
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
}
