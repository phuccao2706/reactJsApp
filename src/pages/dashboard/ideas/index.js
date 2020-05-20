import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { call } from "../../../services";
import IdeaComponent from "./IdeaComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";

import "./index.less";

export default withRouter(
  inject(({ stores }) => stores)(
    observer(function IdeasComponent(props) {
      const [ideas, setIdeas] = useState([]);
      const [aoIdeas, setAoIdeas] = useState(null);
      const [hasMore, setHasMore] = useState(true);

      let getIdeas = async (page) => {
        if (aoIdeas === ideas.length) {
          setHasMore(false);
          return;
        }
        const retrievedIdeas = await call("get", `api/idea/?page=${page}`);
        setIdeas((ideas) => [...ideas, ...retrievedIdeas]);
      };

      let getAoIdeas = async () => {
        const retrievedData = await call("get", `api/idea/amount`);
        setAoIdeas(retrievedData);
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
            {ideas.map((idea, index) => (
              <IdeaComponent key={index} {...idea} />
            ))}
          </InfiniteScroll>
        </div>
      );
    })
  )
);
