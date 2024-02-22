import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import close from '../../../../assets/Logo/actions/cross.svg';

const Ingredient = ({ isOpen = true, onIngredientClose, children }) => {
  const { register, handleSubmit } = useForm();
  if (!isOpen) {
    return null;
  }

  const handleAddIngredients = () => {
    console.log('Label data added');
  };

  return (
    <div className="modal-overlay-recipes">
      <div className="modal-body-recipes modal-body-recipes-ingredient">
        <div className="d-flex flex-column modal-header-recipes list-header">
          <p className="align-self-start fw-bold fs-6">Add Ingredients</p>

          <img
            onClick={() => {
              onIngredientClose();
            }}
            className="align-self-end page-close"
            src={close}
            alt=""
          />
        </div>
        <hr className="my-0" />
        <div className="modal-content-recipes">
          {children}
          <form onSubmit={handleSubmit(handleAddIngredients)}>
            <div className="row p-2">
              <div className="col-md-12 pt-2">
                <label
                  htmlFor="ingredient"
                  className="form-label fw-bold text-warning"
                >
                  Ingredients
                </label>
                <textarea
                  name="ingredient"
                  className="form-control"
                  {...register('name', { required: 'Ingredient is required' })}
                  id="ingredient"
                  placeholder="Ingredient"
                  cols="auto"
                  rows="auto"
                ></textarea>
              </div>

              <div className="col-md-6 py-3">
                <label
                  htmlFor="energy-kj"
                  className="form-label fw-bold text-warning"
                >
                  Energy (kj)
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('energy_kj', {
                    required: 'Energy(kj) is required',
                  })}
                  id="energy-kj"
                  placeholder="Energy(kj)"
                />
              </div>
              <div className="col-md-6 py-3">
                <label
                  htmlFor="sugar"
                  className="form-label fw-bold text-warning"
                >
                  Of which sugars
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('sugar', {
                    required: 'Sugar is required',
                  })}
                  id="sugar"
                  placeholder="Of which sugars"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="energy-kcal"
                  className="form-label fw-bold text-warning"
                >
                  Energy (kcal)
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('energy_kcal', {
                    required: 'Energy(kcal) is required',
                  })}
                  id="energy-kcal"
                  placeholder="Energy(kcal)"
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
                  type="text"
                  className="form-control"
                  {...register('protein', {
                    required: 'Protein is required',
                  })}
                  id="protein"
                  placeholder="Protein"
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
                  placeholder="Fat"
                />
              </div>
              <div className="col-md-6 py-3">
                <label
                  htmlFor="saturated"
                  className="form-label fw-bold text-warning"
                >
                  Of which saturated
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('saturated', {
                    required: 'Saturated is required',
                  })}
                  id="saturated"
                  placeholder="Of which saturated"
                />
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
                  {...register('carbohydrates', {
                    required: 'carbohydrates is required',
                  })}
                  id="carbohydrates"
                  placeholder="Carbohydrates"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="salt"
                  className="form-label fw-bold text-warning"
                >
                  Salt
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('salt', {
                    required: 'Salt is required',
                  })}
                  id="salt"
                  placeholder="Salt"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center pt-3">
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
  onIngredientClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
