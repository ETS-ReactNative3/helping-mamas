import styled from "styled-components";
import variables from "../../design-tokens/_variables.module.scss";

const Container = styled.div`
  background: white;
  width: 95%;
  max-width: 80rem;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid ${(props) => props.theme.grey9};
`;

const Table = styled.table`
  width: 100%;

  th {
    color: ${(props) => props.theme.primaryGrey};
    font-size: 1.2rem;
  }
  th,
  td {
    padding: 1.5rem;
  }
`;
const Row = styled.tr`
  ${(props) => props.evenIndex && "background: #FFFFFF"};
  cursor: pointer;
  border-bottom: 2px solid #f0f0f0;
`;
const LoadingBody = styled.div`
  height: 39rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const EventList = styled.div`
  width: 730px;
  height: 94px;
  position: absolute;
`;

const Inner = styled.div`
  background-color: white;
  width: 100%;
  border: 1px solid ${variables["gray-200"]};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const Slots = styled.span`
  font-size: 12px;
  color: ${variables["gray-300"]};
  margin: 5px;
`;
const Edit = styled.div`
  width: 12px;
  height: 12px;
  left: 606px;
  top: 10px;
  position: absolute;
`;
const Delete = styled.div`
  width: 12px;
  height: 12px;
  left: 666px;
  top: 10px;
  position: absolute;
`;
const Text = styled.div`
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  margin: 12px;
  align-items: center;
`;
const TextInfo = styled.div`
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  margin: 12px;
  align-items: flex-start;
  margin-top: 1.6vw;
`;
const Volunteers = styled.span`
  font-size: 30px;
`;
const EventName = styled.span`
  font-size: 16px;
  color: ${variables.info};
`;
const Time = styled.span`
  font-size: 18px;
`;
const Creation = styled.span`
  width: 154px;
  height: 22px;
  text-align: right;
  font-size: 12px;
  line-height: px;
  left: 556px;
  top: 63px;
  position: absolute;
`;
const Register = styled.div`
  width: 10rem;
  height: 12px;
  left: 606px;
  top: 10px;
  position: absolute;
`;
const UnRegister = styled.div`
  width: 10rem;
  height: 12px;
  left: 606px;
  top: 10px;
  position: absolute;
`;

export {
  Container,
  EventList,
  Inner,
  Slots,
  Edit,
  Delete,
  Text,
  TextInfo,
  Volunteers,
  EventName,
  Time,
  Creation,
  Register,
  UnRegister,
  Table,
  Row,
  LoadingBody,
};
