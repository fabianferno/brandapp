import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'reactstrap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';
import removeByAttr from '../../utils/helpers';

import axios from 'axios';

function Project({ user, error, isLoading }) {
  const router = useRouter();

  const [project, setProject] = useState({});
  const [projectLoading, setProjectLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/projects`, {
        params: {
          _id: router.query._id
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.data) {
          setProject(response.data);
        } else {
          // router.push('/projects');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <div className="mb-5">
            <h1 className="font-weight-bold">{project.name}</h1>
            <h4 children="text-secondary">{project.description}</h4>
          </div>
          <section className="pb-5 mb-5 ">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="btn-dark badge badge-pill mr-2">Urgent</div>
                <div className="btn-danger badge badge-pill mr-2">Feature</div>
                <div className="btn-success badge badge-pill mr-2">Hot Fix</div>
              </div>

              <div className="col-md-3 col-12">
                <select className="form-control bg-primary text-white" id="exampleFormControlSelect1">
                  <option>All</option>
                  <option>Urgent</option>
                  <option>Feature</option>
                  <option>Hot Fix</option>
                </select>
              </div>
            </div>

            <div className="d-flex mt-3">
              <div className="mt-4 mr-5 btn text-right card card-body bg-primary text-white rounded col-3">
                <div>
                  <div>
                    <h2 className="bg-dark p-2 rounded font-weight-bold">Fix Dashboard</h2>
                    <h5 className="p-2">Complete the dashboard integration</h5>
                    <p className="p-2 badge ">Fabian Ferno</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 mr-5 btn text-right card card-body bg-primary text-white rounded col-3">
                <div>
                  <div>
                    <h2 className="bg-dark p-2 rounded font-weight-bold">Fix Dashboard</h2>
                    <h5 className="p-2">Complete the dashboard integration</h5>
                    <p className="p-2 badge ">Fabian Ferno</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Project, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
