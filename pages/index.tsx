import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { GetStaticProps } from "next";

const Index = (props) => (
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name="description"
        content="Browse a huge list of highly active React meetups!"
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
);

export const getStaticProps: GetStaticProps = async () => {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://admin:sxUAyd9kj79Dttq6@cluster0.o25iv.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default Index;
