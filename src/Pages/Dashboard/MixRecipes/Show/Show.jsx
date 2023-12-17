import './Show.css';
import React from 'react';
//import { useParams } from 'react-router-dom';
//import DateFormat from '../../../../components/DateFormat';
import Cross from '../../../../assets/Logo/cross.svg';
import Sidebar from '../Sidebar/Sidebar';

const Show = () => {
  //const params = useParams();

  return (
    <div className="recipe-content">
      <div
        /* className="recipe-sidebar" */
        style={{
          width: '280px',
          marginTop: '250px',
        }}
      >
        <Sidebar />
      </div>
      <div className="recipe-component container">
        <div>
          <img
            style={{
              width: '28px',
              height: '28px',
              /* marginLeft: '1170px', */
              /* marginLeft: '1092px',
              marginTop: '10px', */
              position: 'absolute',
              top: '131px',
              right: '40px',
              color: '#302980',
            }}
            src={Cross}
            alt=""
          />
          <button
            className="Btn Btn-text"
            style={{
              backgroundColor: '#ffad05',
              width: '235px',
              height: '40px',
              /* marginLeft: '655px', */
              position: 'absolute',
              top: '197px',
              right: '64px',
              borderStyle: 'none',
              borderRadius: '4px',
              fontWeight: '700',
              fontSize: '18px',
              textAlign: 'center',
              lineHeight: '24px',
              letterSpacing: '3%',
              color: '#FFFFFF',
              padding: '4px',
            }}
          >
            UPDATE INFO
          </button>
          <div>
            <h1
              className="mixrecipe-show-header"
              style={{
                display: 'inline-block',
                /* paddingLeft: '40px',
                marginTop: '14px',
                marginBottom: '14px', */
                marginTop: '89px',
                marginLeft: '59px',
                fontSize: '24px',
                fontWeight: '600',
                color: '#302980',
                lineHeight: '32px',
              }}
            >
              Recipe Information
            </h1>
          </div>

          <div className="card supplier-form">
            <div className="card-body" style={{ marginTop: '100px' }}>
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <th scope="col" className="text-warning">
                      Mix Recipe Name
                    </th>
                    <td>Foodora mix 2023</td>
                    <th scope="col" className="text-warning">
                      Total Weight (g)
                    </th>
                    <td>626.1</td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-warning">
                      External ID Ref
                    </th>
                    <td>Foofora02</td>
                    <th scope="col" className="text-warning">
                      Created At
                    </th>
                    <td>12-09-2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h1
            /* className="card-title m-3" */
            style={{
              /* paddingLeft: '40px',
              marginTop: '52px',
              marginBottom: '14px', */
              marginTop: '361px',
              marginLeft: '59px',
              fontSize: '24px',
              fontWeight: '600',
              color: '#302980',
              lineHeight: '31.2px',
              letterSpacing: '1%',
            }}
          >
            Product Information
          </h1>
          <div className="mb-3">
            <div className="card supplier-form ">
              <div className="card-body">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" className="text-warning">
                        Product Name
                      </th>
                      <th scope="col" className="text-warning">
                        Weight(g)
                      </th>
                      <th scope="col" className="text-warning">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Fizzy Cola Dummies</td>
                      <td>39656.7</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>Fizzy Cola Dummies</td>
                      <td>39656.7</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>Fizzy Cola Dummies</td>
                      <td>39656.7</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td>Fizzy Cola Dummies</td>
                      <td>39656.7</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Fizzy Cola Dummies</td>
                      <td>39656.7</td>
                      <td>12</td>
                    </tr>
                    <tr>
                      <td>Fizzy Cola Dummies</td>
                      <td>39656.7</td>
                      <td>4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
