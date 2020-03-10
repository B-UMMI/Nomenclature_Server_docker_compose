import React, { Component } from "react";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  Link,
  useRouteMatch
} from "react-router-dom";
import { connect } from "react-redux";

// Chewie Components
import Aux from "./hoc/Aux/Aux";
import Layout from "./hoc/Layout/Layout";
import Chewie from "./containers/Chewie/Chewie";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Stats from "./containers/Stats/Stats";
import Species from "./containers/Species/Species";
import Schema from "./containers/Schema/Schema";
import Locus from "./containers/Locus/Locus";
import * as actions from "./store/actions/index";

// Material Ui Components
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import MuiLink from "@material-ui/core/Link";

function SimpleBreadcrumbs() {
  const homeMatches = useRouteMatch("/");
  const statsMatches = useRouteMatch("/stats");
  const speciesIdMatches = useRouteMatch("/species/:species_id");
  const schemasIdMatches = useRouteMatch(
    "/species/:species_id/schemas/:schema_id"
  );
  const locusIdMatches = useRouteMatch(
    "/species/:species_id/schemas/:schema_id/locus/:locus_id"
  );

  const styles = {
    breadcrumb: {
      color: "#bb7944"
    }
  };

  const spd = JSON.parse(localStorage.getItem("speciesD"));

  return (
    <>
      <Breadcrumbs>
        {homeMatches && (
          <MuiLink component={Link} to="/" style={styles.breadcrumb}>
            Home
          </MuiLink>
        )}
        {statsMatches && (
          <MuiLink component={Link} to="/stats" style={styles.breadcrumb}>
            Schemas
          </MuiLink>
        )}
        {speciesIdMatches && (
          <MuiLink
            component={Link}
            to={`/species/${speciesIdMatches.params.species_id}`}
            style={styles.breadcrumb}
          >
            {spd[speciesIdMatches.params.species_id]}
          </MuiLink>
        )}
        {schemasIdMatches && (
          <MuiLink
            component={Link}
            to={`/species/${schemasIdMatches.params.species_id}/schemas/${schemasIdMatches.params.schema_id}`}
            style={styles.breadcrumb}
          >
            Schema {schemasIdMatches.params.schema_id}
          </MuiLink>
        )}
        {locusIdMatches && (
          <MuiLink
            component={Link}
            to={`/schema/${locusIdMatches.params.schema_id}/${locusIdMatches.params.locus_id}`}
            style={styles.breadcrumb}
          >
            Locus {locusIdMatches.params.locus_id}
          </MuiLink>
        )}
      </Breadcrumbs>
    </>
  );
}

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Aux>
        <SimpleBreadcrumbs />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={Chewie} />
          <Route path="/stats" component={Stats} />
          <Route
            path="/species/:species_id/schemas/:schema_id/locus/:locus_id"
            component={Locus}
          />
          <Route
            path="/species/:species_id/schemas/:schema_id"
            component={Schema}
          />
          <Route path="/species/:species_id" component={Species} />
          <Redirect to="/" />
        </Switch>
      </Aux>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/stats" component={Stats} />
          <Route path="/" exact component={Chewie} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
