import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import {
  withRouter,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import IdeaComponent from "./IdeaComponent";
import IdeaDetailComponent from "../ideaDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";

import { call } from "../../../services";
import "./index.less";

export default withRouter(
  inject(({ stores }) => stores)(
    observer(function IdeasComponent(props) {
      const [ideas, setIdeas] = useState([]);
      const [aoIdeas, setAoIdeas] = useState(null);
      const [hasMore, setHasMore] = useState(true);

      const { path, url } = useRouteMatch();

      let getIdeas = async (page) => {
        const {
          globalState: { ideasToShow },
        } = props;
        if (aoIdeas === ideasToShow.length) {
          setHasMore(false);
          return;
        }
        const retrievedIdeas = await call("get", `api/idea/?page=${page}`);

        props.globalState.setState({
          ideasToShow: [...ideasToShow, ...retrievedIdeas],
        });
        // setIdeas((ideas) => [...ideas, ...retrievedIdeas]);
      };

      let getAoIdeas = async () => {
        const retrievedData = await call("get", `api/idea/amount`);
        setAoIdeas(retrievedData);
      };

      const setGlobalState = (obj) => {
        props.globalState.setState(obj);
      };

      useEffect(() => {
        getIdeas(1);
        getAoIdeas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <div className="ideasContainer">
          <InfiniteScroll
            dataLength={ideas.length}
            next={() => getIdeas(Math.ceil(ideas.length / 10) + 1)}
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
            <Route path={`${path}/:topicId`}>
              <IdeaDetailComponent />
            </Route>
          </Switch>
        </div>
      );
    })
  )
);
