import React, { useEffect, useState } from "react";
import "./App.css";

import {
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CRow,
  CCol,
  CSpinner,
} from "@coreui/react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(tz);

function App() {
  const [players, setPlayers] = useState([]);
  const timeZone = dayjs.tz.guess();

  const fetchUsers = () => {
    fetch(`https://api.npoint.io/20c1afef1661881ddc9c`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          result.playerList = result.playerList.sort(
            (a, b) => a.Value - b.Value
          );
          setPlayers(result.playerList);
        },

        (error) => {
          console.error(error);
        }
      );

    // .catch((err) => {
    //   console.error(err);
    //   // this.setState({
    //   //     items: json,
    //   //     DataisLoaded: true
    //   // });
    // });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>List of All players</h2>
      <div>
        <CRow>
          {players.length ? (
            players.map((player, ind) => {
              // console.log("id", player.Id);
              return (
                <CCol xs>
                  <CCard>
                    <CCardImage
                      orientation="top"
                      src={
                        `/player-images/${player.Id}.jpg`
                          ? `/player-images/${player.Id}.jpg`
                          : `/player-images/63706.jpg`
                      }
                    />
                    <CCardBody>
                      <CCardText>
                        <strong>Name:</strong>
                        {player.PDName}
                      </CCardText>
                      <CCardText>
                        <strong>Skills:</strong>
                        {player.SkillDesc}
                      </CCardText>
                      <CCardText>
                        <strong>value:$</strong>
                        {player.Value}
                      </CCardText>
                      {player.UpComingMatchesList[0].CCode !== "" && (
                        <>
                          <CCardText>
                            <strong>UpComing Matches Details: </strong>

                            <small className="text-medium-emphasis">
                              {player.UpComingMatchesList[0].CCode} VS{" "}
                              {player.UpComingMatchesList[0].VsTSCode}
                            </small>
                          </CCardText>
                          <CCardText>
                            {" "}
                            <strong>Match Time:</strong>
                            <small className="text-medium-emphasis">
                              {dayjs
                                .utc(player.UpComingMatchesList[0].MDate)
                                .tz(timeZone)
                                .format("DD-MM-YYYY h:mm:ss a")}
                            </small>
                          </CCardText>
                        </>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              );
            })
          ) : (
            <CSpinner size="sm" variant="grow" />
          )}
        </CRow>
      </div>
    </div>
  );
}

export default App;
