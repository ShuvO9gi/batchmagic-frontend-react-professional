import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import close from '../../../../assets/Logo/actions/cross.svg';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

const Ingredient = ({
  isOpen = true,
  onIngredientClose,
  batchTemplateId,
  children,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState({});
  const { setLoading } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  if (!isOpen) {
    return null;
  }

  const handleAddIngredients = async (data, e) => {
    console.log('Label data added');
    data = { ...data, batch_template_id: batchTemplateId };
    const controller = new AbortController();
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosPrivate.post('/batch-template-ingredient', data, {
        signal: controller.signal,
      });

      if (res.status == 200) {
        setLoading(false);
        controller.abort();
        console.log('Success');
        console.log(res);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log(err.response.data.errors);
      setErr(err.response.data.errors);
    }
  };

  return (
    <div className="modal-overlay-recipes">
      <div className="modal-body-recipes modal-body-recipes-ingredient">
        <div className="d-flex justify-content-between modal-header-recipes list-header">
          <p className="fw-bold fs-6">Add Ingredients</p>

          <img
            onClick={() => {
              onIngredientClose();
            }}
            className="modal-close"
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
                  name="ingredients"
                  className="form-control"
                  {...register('ingredients', {
                    required: 'Ingredient is required',
                  })}
                  id="ingredient"
                  placeholder="Ingredient"
                  cols="auto"
                  rows="auto"
                ></textarea>
                {errors.ingredients && (
                  <p className="text-danger">
                    {/* console.log(errors) */ errors.ingredients.message}
                  </p>
                )}
                {err && (
                  <p className="text-danger">{console.log(err?.energy_kj)}</p>
                )}
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
                  /* placeholder="Energy(kj)" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">{errors.energy_kj.message}</p>
                )}
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
                  {...register('of_which_sugars', {
                    required: 'Of which sugar is required',
                  })}
                  id="sugar"
                  /* placeholder="Of which sugars" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">
                    {errors.of_which_sugars.message}
                  </p>
                )}
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
                  /* placeholder="Energy(kcal)" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">{errors.energy_kcal.message}</p>
                )}
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
                  /* placeholder="Protein" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">{errors.protein.message}</p>
                )}
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
                  /* placeholder="Fat" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">{errors.fat.message}</p>
                )}
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
                  {...register('of_which_saturated', {
                    required: 'Of which saturated is required',
                  })}
                  id="saturated"
                  /* placeholder="Of which saturated" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">
                    {errors.of_which_saturated.message}
                  </p>
                )}
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
                    required: 'Carbohydrates is required',
                  })}
                  id="carbohydrates"
                  /* placeholder="Carbohydrates" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">{errors.carbohydrates.message}</p>
                )}
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
                  /* placeholder="Salt" */
                />
                {errors.energy_kj && (
                  <p className="text-danger">{errors.salt.message}</p>
                )}
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
  batchTemplateId: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
