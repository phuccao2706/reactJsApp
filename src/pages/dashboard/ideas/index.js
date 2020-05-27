import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import { Skeleton } from "antd";
import IdeaComponent from "./IdeaComponent";
import IdeaDetailComponent from "../ideaDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import NewPostComponen from "../newPost";

import { call } from "../../../services";
import "./index.less";

export default withRouter(
  inject(({ stores }) => stores)(
    observer(function IdeasComponent(props) {
      const [hasMore, setHasMore] = useState(true);

      const { path, url } = useRouteMatch();
      let getIdeas = async (page) => {
        const {
          globalState: { ideasToShow },
        } = props;
        const aoIdeas = await getAoIdeas();

        if (aoIdeas === ideasToShow.length) {
          setHasMore(false);
          return;
        }
        const retrievedIdeas = await call("get", `api/idea/?page=${page}`);
        console.log(retrievedIdeas);
        props.globalState.setState({
          ideasToShow: [...ideasToShow, ...retrievedIdeas],
        });
        // setIdeas((ideas) => [...ideas, ...retrievedIdeas]);
      };

      let getAoIdeas = async () => {
        const retrievedData = await call("get", `api/idea/amount`);
        return retrievedData;
      };

      const setGlobalState = (obj) => {
        props.globalState.setState(obj);
      };

      useEffect(() => {
        getIdeas(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const { ideasToShow, currentUser } = props.globalState;

      return (
        currentUser && (
          <div className="ideasContainer">
            <InfiniteScroll
              dataLength={ideasToShow.length}
              next={() => getIdeas(Math.ceil(ideasToShow.length / 10) + 1)}
              hasMore={hasMore}
              loader={<Skeleton avatar paragraph={{ rows: 4 }} />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  I have no 'ideas'{" "}
                  <span role="img" aria-label="bulb">
                    💡
                  </span>
                </p>
              }
            >
              <NewPostComponen />

              {props.globalState.ideasToShow.map((idea, index) => (
                <IdeaComponent
                  key={index}
                  ideaToShow={idea}
                  globalStateRef={{ ...props.globalState }}
                  setGlobalState={setGlobalState}
                />
              ))}
            </InfiniteScroll>

            <Switch>
              <Route exact={true} path={`${path}/:topicId`}>
                <IdeaDetailComponent />
              </Route>
            </Switch>
          </div>
        )
      );
    })
  )
);
