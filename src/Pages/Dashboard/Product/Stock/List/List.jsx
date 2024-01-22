import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import show from '../../../../../assets/Logo/file.png';
import edit from '../../../../../assets/Logo/actions/edit.svg';

const Index = () => {
  const [products, setProducts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get('/products', {
          signal: controller.signal,
        });
        if (isMounted) {
          setProducts(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          // Handle abort error if needed
        } else {
          // Handle other errors
        }
      }
    };
    getProducts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  console.log(products);

  const filteredProducts = products?.filter(
    (product) => product.stocks && product.stocks.length > 0,
  );

  return (
    filteredProducts.length > 0 && (
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-center">
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Batch Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Supplier
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Stock Weight
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    return (
                      <React.Fragment key={product.id}>
                        <tr>
                          <td
                            className="px-6 py-4 whitespace-nowrap"
                            rowSpan={product.stocks.length}
                          >
                            <div className="text-sm text-gray-900">
                              {product.name}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.stocks[0].ingoing_batch_number}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.supplier.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.stocks[0].total_weight -
                                product.stocks[0].total_sold_weight}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="action-container">
                              <Link
                                to={`/dashboard/stock/show/${product.stocks[0].id}`}
                              >
                                <button className="btn btn-action-customized">
                                  <img
                                    src={show}
                                    className="show-action"
                                    alt=""
                                  />
                                </button>
                              </Link>
                              <Link
                                to={`/dashboard/stock/edit/${product.stocks[0].id}`}
                              >
                                <button className="btn btn-action-customized">
                                  <img
                                    src={edit}
                                    className="edit-action"
                                    alt=""
                                  />
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                        {product.stocks.slice(1).map((stock) => {
                          return (
                            <tr key={stock.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {stock.ingoing_batch_number}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {product.supplier.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {stock.total_weight - stock.total_sold_weight}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Index;
