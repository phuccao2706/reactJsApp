import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Switch, Route } from "react-router-dom";
import IdeaComponent from "./IdeaComponent";

import { call } from "../../../services";
import "./index.less";
import IdeaDetailComponent from "../ideaDetail";
import { Spin } from "antd";
import { GLOBAL_STATE } from "../../../constants";

export default withRouter(
  inject(({ stores }) => stores)(
    observer(function IdeasComponent(props) {
      const [loadingState, setLoadingState] = useState(true);

      let getIdeas = async () => {
        const retrievedIdeas = await call("get", `api/idea/`);
        if (retrievedIdeas) {
          props.globalState.setState({
            ideasToShow: retrievedIdeas,
          });
          setLoadingState(false);
        }
      };

      useEffect(() => {
        if (!props.globalState[GLOBAL_STATE.initDashboardFromCreate]) {
          console.log(props.globalState.ideasToShow);
          getIdeas();
        } else {
          setLoadingState(false);
          props.globalState.setState({
            [GLOBAL_STATE.initDashboardFromCreate]: false,
          });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      // useEffect(() => {
      //   console.log(props.location.state.fromCreateIdea);
      // }, [props.location]);

      const {
        globalState: { ideasToShow, currentUser },
        match: { path },
      } = props;
      return (
        currentUser &&
        (!loadingState ? (
          <div className="ideasContainer">
            {ideasToShow.map((idea, index) => (
              <IdeaComponent
                key={index}
                ideaToShow={idea}
                globalStateRef={{ ...props.globalState }}
              />
            ))}

            <Switch>
              <Route exact path={`${path}/:topicId`}>
                <IdeaDetailComponent />
              </Route>
            </Switch>
          </div>
        ) : (
          <Spin size="large" />
        ))
      );
    })
  )
);
