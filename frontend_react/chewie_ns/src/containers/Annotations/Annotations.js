import React, { Component } from 'react';
import { connect } from "react-redux";

import axios from "../../axios-backend";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

// Material-UI components
import CircularProgress from "@material-ui/core/CircularProgress";

// Material-UI Datatables
import MUIDataTable from "mui-datatables";

class Annotations extends Component {
    componentDidMount() {
        this.props.onFetchAnnotations();
      }
    
    render() {
        let annotations = <CircularProgress />;
        if (!this.props.loading) {

            const columns = [
              {
                name: "uniprot_label",
                label: "Uniprot Label",
                options: {
                  filter: true,
                  sort: true,
                  display: true,
                  setCellHeaderProps: value => {
                    return {
                      style: {
                        fontWeight: "bold"
                      }
                    };
                  }
                }
              },
              {
                name: "uniprot_uri",
                label: "Uniprot URI",
                options: {
                  filter: true,
                  sort: true,
                  display: true,
                  setCellHeaderProps: value => {
                    return {
                      style: {
                        fontWeight: "bold"
                      }
                    };
                  },
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
                    )
                  }
                }
              },
              {
                name: 'species',
                label: 'Species',
                options: {
                    filter: true,
                    sort: true,
                    display: true,
                    setCellHeaderProps: value => {
                        return {
                            style: {
                                fontWeight: "bold"
                            }
                        };
                    }
                }
              },
              {
                  name: 'schema',
                  label: 'Schema ID',
                  options: {
                      filter: true,
                      sort: true,
                      display: true,
                      setCellHeaderProps: value => {
                          return {
                              style: {
                                  fontWeight: "bold"
                              }
                          };
                      }
                  }
              },
              {
                name: 'locus',
                label: 'Locus ID',
                options: {
                    filter: true,
                    sort: true,
                    display: true,
                    setCellHeaderProps: value => {
                        return {
                            style: {
                                fontWeight: "bold"
                            }
                        };
                    }
                }
            }
            ]
      
            const options = {
              responsive: "scrollMaxHeight",
              selectableRowsHeader: false,
              selectableRows: "none",
              selectableRowsOnClick: true,
              print: false,
              download: true,
              filter: true,
              search: true,
              viewColumns: true,
              pagination: true
            };
      
            annotations = (
              <MUIDataTable
                title={"Annotations"}
                data={this.props.annotations}
                columns={columns}
                options={options}
              />
            );
            }
        return (
            <div>
                {annotations}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      annotations: state.annotations.annotations,
      loading: state.locus.loading,
      error: state.locus.error
      // token: state.auth.token
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onFetchAnnotations: () => dispatch(actions.fetchAnnotations()),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(Annotations, axios));