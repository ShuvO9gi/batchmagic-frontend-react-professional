import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import close from '../../../../assets/Logo/actions/cross.svg';

const Ingredient = ({ isOpen = true, onClose, children }) => {
  const { register, handleSubmit } = useForm();
  if (!isOpen) {
    return null;
  }

  const handleAddIngredients = () => {
    console.log('Label data added');
  };

  return (
    <div className="modal-overlay">
      <div className="stock-modal" style={{ width: '60%', marginTop: 170 }}>
        <div className="d-flex flex-column stock-modal-header list-header">
          <p
            className="align-self-start"
            style={{ fontWeight: 600, fontSize: 16 }}
          >
            Add Ingredients
          </p>

          <img
            onClick={() => {
              /* setStockChanged(true); */

              onClose();
            }}
            className="align-self-end page-close"
            src={close}
            alt=""
          />
        </div>
        <hr />
        <div className="stock-modal-content">
          {children}
          <form onSubmit={handleSubmit(handleAddIngredients)}>
            <div className="row p-2">
              <div className="col-md-12">
                <label
                  htmlFor="ingredient"
                  className="form-label fw-bold text-warning"
                >
                  Ingredients
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('name', { required: 'Ingredient is required' })}
                  id="ingredient"
                  placeholder="Ingredient"
                />
              </div>

              <div className="col-md-6 py-3">
                <label
                  htmlFor="energy"
                  className="form-label fw-bold text-warning"
                >
                  Energy (kj)
                </label>
                <input
                  type="number"
                  className="form-control"
                  {...register('energy', { required: 'Energy is required' })}
                  id="energy"
                />
              </div>
              <div className="col-md-6 py-3">
                <label
                  htmlFor="sugar"
                  className="form-label fw-bold text-warning"
                >
                  Of which sugars
                </label>
                <input type="text" className="form-control" id="sugar" />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="energy-cal"
                  className="form-label fw-bold text-warning"
                >
                  Energy (kcal)
                </label>
                <input
                  type="number"
                  className="form-control"
                  {...register('energy_cal', {
                    required: 'Energy(cal) is required',
                  })}
                  id="energy-cal"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="protein"
                  className="form-label fw-bold text-warning"
                >
                  Protein
                </label>
                <input
                  type="number"
                  className="form-control"
                  {...register('protein', {
                    required: 'Protein is required',
                  })}
                  id="protein"
                />
              </div>
              <div className="col-md-6 py-3">
                <label
                  htmlFor="fat"
                  className="form-label fw-bold text-warning"
                >
                  Fat
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('fat', {
                    required: 'Fat is required',
                  })}
                  id="fat"
                />
              </div>
              <div className="col-md-6 py-3">
                <label
                  htmlFor="saturated"
                  className="form-label fw-bold text-warning"
                >
                  Of which saturated
                </label>
                <input type="text" className="form-control" id="saturated" />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="carbohydrates"
                  className="form-label fw-bold text-warning"
                >
                  Carbohydrates
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="carbohydrates"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="salt"
                  className="form-label fw-bold text-warning"
                >
                  Salt
                </label>
                <input type="text" className="form-control" id="salt" />
              </div>
            </div>
            <div className="d-flex justify-content-center p-4">
              <button
                type="submit"
                className="btn btn-orange float-center create-create-btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;

Ingredient.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
