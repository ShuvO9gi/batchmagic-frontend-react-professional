import React from 'react';
import './Show.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DateFormat from '../../../../components/DateFormat';
import { isEmpty } from '../../../../components/utils';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import ErrorModal from '../../../../components/ErrorModal';
import Cross from '../../../../assets/Logo/cross.svg';

const Show = () => {
  const [batchTemplate, setBatchTemplate] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getBatchtemplate = async () => {
      try {
        const response = await axiosPrivate.get(
          `/batch-template/${params.id}`,
          {
            signal: controller.signal,
          },
        );
        if (isMounted) {
          setBatchTemplate(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getBatchtemplate();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {isEmpty(batchTemplate) ? (
        <Loader />
      ) : (
        <div>
          <img className="x-sign" src={Cross} alt="" />

          <button className="Btn Btn-text">UPDATE INFO</button>

          <div className="container recipe-component">
            <h1 className="mixrecipe-card-header">Recipe Information</h1>
            <div>
              <div className="card supplier-form">
                <div className="card-body">
                  <table className="table table-striped table-bordered">
                    <tbody>
                      <tr>
                        <th className="text-orange">Mix Recipe Name</th>
                        <td>{batchTemplate?.name}</td>
                        <th className="text-orange">Total Weight (g)</th>
                        <td>
                          {Number(batchTemplate?.total_weight?.toFixed(2))}
                        </td>
                      </tr>
                      <tr>
                        <th className="text-orange">External ID Ref</th>
                        <td>{batchTemplate?.external_ref}</td>
                        <th className="text-orange"> Create At</th>
                        <td>
                          <DateFormat dateValue={batchTemplate?.created_at} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <h1 className="mixrecipe-card-header2">Product Information</h1>
            {batchTemplate?.batch_products && (
              <div className="my-3">
                <div className="card p-3">
                  <div className="card-body">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" className="text-orange">
                            Product Name
                          </th>
                          <th scope="col" className="text-orange">
                            Weight(g)
                          </th>
                          <th scope="col" className="text-orange">
                            Quantity
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {batchTemplate?.batch_products?.map((product) => {
                          return (
                            <tr key={product?.id}>
                              <td> {product?.product?.name}</td>
                              <td>{Number(product?.weight?.toFixed(2))}</td>
                              <td>{product?.amount}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Show;
