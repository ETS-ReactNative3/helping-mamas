import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { Button } from "reactstrap";
import Icon from "../../../components/Icon";
import EventTable from "./EventTable";
import { fetchEvents } from "../../../actions/queries";
import { updateEvent } from "./eventHelpers";
import variables from "../../../design-tokens/_variables.module.scss";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.grey9};
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  HeaderContainer: styled.div`
    width: 60%;
    max-width: 80rem;
    display: flex;
    justify-content: start;
    margin: 0 auto;
  `,
  Button: styled(Button)`
    background: ${variables.primary};
    border: none;
    color: white;
    width: 10rem;
    height: 3rem;
    margin-top: 1rem;
  `,
  Events: styled.div`
  text-align: left;
  font-size: 36px;
  font-weight: bold;
`,
  EventContainer: styled.div`
    width: 78%;
    max-width: 80rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin-bottom: 1rem;
  `,
  Content: styled.div`
    width: 60%;
    height: 100%;
    background: ${(props) => props.theme.grey9};
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    align-items: start;
  `,
  Date: styled.div`
    text-align: left;
    font-size: 28px;
    font-weight: bold;
  `,
  DateRow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  Back: styled.p`
    font-size: 14px;
    margin-left: 10px;
    padding-top: 5px;
    text-decoration: underline;
    color: ${variables.primary};
  `
};

const EventManager = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [markDates, setDates] = useState([]);

  if (!user) {
    const { data: session } = useSession();
    user = session.user;
  }

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    fetchEvents(undefined, new Date().toLocaleDateString("en-US"))
      .then((result) => {
        if (result && result.data && result.data.events) {
          setEvents(result.data.events);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [value, setDate] = useState(new Date());

  const onChange = (value, event) => {
    setDate(value);
    let datestr = value.toString();
    let selectDate = new Date(datestr).toISOString().split("T")[0];

    setLoading(true);
    fetchEvents(selectDate, selectDate)
      .then((result) => {
        if (result && result.data && result.data.events) {
          setEvents(result.data.events);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRegister = async (event) => {
    const changedEvent = {
      ...event,
      volunteers: event.volunteers.concat(user._id),
    }; // adds userId to event
    const updatedEvent = await registerForEvent({ user, event: changedEvent }); // updates event in backend
    setEvents(events.map((e) => (e._id === event._id ? updatedEvent : e))); // set event state to reflect new event

    onRefresh();
  };

  const onUnregister = async (event) => {
    const changedEvent = {
      // remove current user id from event volunteers
      ...event,
      volunteers: event.volunteers.filter(
        (volunteer) => volunteer !== user._id
      ),
    };
    const updatedEvent = await updateEvent(changedEvent);
    setEvents(events.map((e) => (e._id === event._id ? updatedEvent : e)));

    onRefresh();
  };

  const formatJsDate = (jsDate, separator = "/") => {
    return [
      String(jsDate.getFullYear()).padStart(4, "0"),
      String(jsDate.getMonth() + 1).padStart(2, "0"),
      String(jsDate.getDate()).padStart(2, "0"),
    ].join(separator);
  };
  const setMarkDates = ({ date, view }, markDates) => {
    const fDate = formatJsDate(date, "-");
    let tileClassName = "";
    let test = [];
    for (let i = 0; i < markDates.length; i++) {
      test.push(markDates[i].date.slice(0, 10));
    }
    if (test.includes(fDate)) {
      tileClassName = "marked";
    }
    return tileClassName !== "" ? tileClassName : null;
  };

  return (
    <Styled.Container>
      <Styled.HeaderContainer>
        <Styled.EventContainer>
            <Styled.Events>Events</Styled.Events>
            <Styled.DateRow>
              <Styled.Date>{value.toDateString()}</Styled.Date>
              <Styled.Back>Back to Today</Styled.Back>
            </Styled.DateRow>
        </Styled.EventContainer>
        <Styled.Button onClick={onRefresh} >
          <span style={{ color: "white"}}>Create New Event</span>
        </Styled.Button>
      </Styled.HeaderContainer>
      <Styled.Content>
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={({ date, view }) =>
            setMarkDates({ date, view }, markDates)
          }
        />

        <EventTable
          events={events}
          onRegisterClicked={onRegister}
          onUnregister={onUnregister}
          user={user}
        >
          {" "}
        </EventTable>
      </Styled.Content>

    </Styled.Container>
  );
};

export default EventManager;
