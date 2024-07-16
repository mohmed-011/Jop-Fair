$(()=>{
    $("#Togg").on("click", function () {
      $("html").toggleClass("dark");
    });

    if (document.getElementById("transaction-table")) {
      initTranPage();
    } else if (document.getElementById("customer-details")) {
      initDetPage();
    }

    function initTranPage() {
      let customers = [];
      let transactions = [];

      fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
          customers = data.customers;
          transactions = data.transactions;
          d_Table(transactions);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      const tableBody = document.getElementById("transaction-table");
      const searchInput = document.getElementById("search");

      function d_Table(data) {
        tableBody.innerHTML = "";
        data.forEach((transaction) => {
          const customer = customers.find(
            (customer) => customer.id === transaction.customer_id
          );
          const row = document.createElement("tr");
          row.classList.add("cursor-pointer");
          row.innerHTML = `
                    <td class="text-center transition-all duration-[0.4s] dark:hover:bg-[#ececec] dark:hover:text-[#494949]  hover:bg-[#494949] hover:text-white dark:text-white text-[18px] font-[500] py-3 rounded-md border border-b-[1px]">${customer.name}</td>
                    <td class="text-center transition-all duration-[0.4s] dark:hover:bg-[#ececec] dark:hover:text-[#494949]  hover:bg-[#494949] hover:text-white dark:text-white text-[18px] font-[500] py-3 rounded-md border border-b-[1px]">${transaction.date}</td>
                    <td class="text-center transition-all duration-[0.4s] dark:hover:bg-[#ececec]   hover:bg-[#494949] text-[18px] font-[500] text-green-500 py-3 rounded-md border border-b-[1px]">${transaction.amount} $</td>
                `;
          row.addEventListener("click", () => {
            window.location.href = `customer-details.html?id=${customer.id}`;
          });
          tableBody.appendChild(row);
        });
      }

      function filterTable() {
        const filterText = searchInput.value.toLowerCase();
        const filteredTransactions = transactions.filter((transaction) => {
          const customer = customers.find(
            (c) => c.id === transaction.customer_id
          );
          return (
            customer.name.toLowerCase().includes(filterText) ||
            transaction.amount.toString().includes(filterText)
          );
        });
        d_Table(filteredTransactions);
      }

      searchInput.addEventListener("input", filterTable);
    }
    let customer;
    let Total = [];
    function initDetPage() {
      const urlParams = new URLSearchParams(window.location.search);
      const customerId = urlParams.get("id");

      let transactions = [];
      let chart;
      let curType = "bar";

      fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
          customer = data.customers.find((c) => c.id === parseInt(customerId));
          console.log(data.customers[0].Total);
          console.log(customer);
          transactions = data.transactions.filter(
            (t) => t.customer_id === parseInt(customerId)
          );
          for (const x of data.customers) {
            Total.push(x.Total);
          }
          pieChart();
          console.log(Total);
          if (customer && transactions.length > 0) {
            displayDetails(customer);
            d_Chart(transactions, curType);
          } else {
            console.error("Customer or transactions not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      const customer_div = document.getElementById("customer-details");
      const CanvasEle = document.getElementById("transactionChart");

      function displayDetails(customer) {
        if (!customer_div) {
          console.error("Customer  element not found");
          return;
        }

        customer_div.innerHTML = `
            <div
  class="profile-card w-[280px] mx-auto  rounded-md shadow-2xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
>
  <div
    class="avatar w-full pt-6 flex items-center justify-center flex-col gap-1"
  >
    <div
      class="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-sky-800 after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-sky-800 before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300"
    >
      <svg
        class="size-36 z-40 border-4 border-white rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300"
        id="avatar"
        viewBox="0 0 61.8 61.8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g data-name="Layer 2">
          <g data-name="—ÎÓÈ 1">
            <path
              d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z"
              fill-rule="evenodd"
              fill="#ffe8be"
            ></path>
            <circle fill="#58b0e0" r="30.9" cy="30.9" cx="30.9"></circle>
            <path
              d="M45.487 19.987l-29.173.175s1.048 16.148-2.619 21.21h35.701c-.92-1.35-3.353-1.785-3.909-21.385z"
              fill-rule="evenodd"
              fill="#60350a"
            ></path>
            <path
              d="M18.135 45.599l7.206-3.187 11.55-.3 7.42 3.897-5.357 11.215-7.613 4.088-7.875-4.35-5.331-11.363z"
              fill-rule="evenodd"
              fill="#d5e1ed"
            ></path>
            <path
              d="M24.744 38.68l12.931.084v8.949l-12.931-.085V38.68z"
              fill-rule="evenodd"
              fill="#f9dca4"
            ></path>
            <path
              opacity=".11"
              d="M37.677 38.778v3.58a9.168 9.168 0 0 1-.04 1.226 6.898 6.898 0 0 1-.313 1.327c-4.37 4.165-11.379.78-12.49-6.333z"
              fill-rule="evenodd"
            ></path>
            <path
              d="M52.797 52.701a30.896 30.896 0 0 1-44.08-.293l1.221-3.098 9.103-4.122c3.262 5.98 6.81 11.524 12.317 15.455A45.397 45.397 0 0 0 43.2 45.483l8.144 3.853z"
              fill-rule="evenodd"
              fill="#434955"
            ></path>
            <path
              d="M19.11 24.183c-2.958 1.29-.442 7.41 1.42 7.383a30.842 30.842 0 01-1.42-7.383zM43.507 24.182c2.96 1.292.443 7.411-1.419 7.384a30.832 30.832 0 001.419-7.384z"
              fill-rule="evenodd"
              fill="#f9dca4"
            ></path>
            <path
              d="M31.114 8.666c8.722 0 12.377 6.2 12.601 13.367.307 9.81-5.675 21.43-12.6 21.43-6.56 0-12.706-12.018-12.333-21.928.26-6.953 3.814-12.869 12.332-12.869z"
              fill-rule="evenodd"
              fill="#ffe8be"
            ></path>
            <path
              d="M33.399 24.983a7.536 7.536 0 0 1 5.223-.993h.005c5.154.63 5.234 2.232 4.733 2.601a2.885 2.885 0 0 0-.785 1.022 6.566 6.566 0 0 1-1.052 2.922 5.175 5.175 0 0 1-3.464 2.312c-.168.027-.34.048-.516.058a4.345 4.345 0 0 1-3.65-1.554 8.33 8.33 0 0 1-1.478-2.53v.003s-.797-1.636-2.072-.114a8.446 8.446 0 0 1-1.52 2.64 4.347 4.347 0 0 1-3.651 1.555 5.242 5.242 0 0 1-.516-.058 5.176 5.176 0 0 1-3.464-2.312 6.568 6.568 0 0 1-1.052-2.921 2.75 2.75 0 0 0-.77-1.023c-.5-.37-.425-1.973 4.729-2.603h.002a7.545 7.545 0 0 1 5.24 1.01l-.001-.001.003.002.215.131a3.93 3.93 0 0 0 3.842-.148l-.001.001zm-4.672.638a6.638 6.638 0 0 0-6.157-.253c-1.511.686-1.972 1.17-1.386 3.163a5.617 5.617 0 0 0 .712 1.532 4.204 4.204 0 0 0 3.326 1.995 3.536 3.536 0 0 0 2.966-1.272 7.597 7.597 0 0 0 1.36-2.37c.679-1.78.862-1.863-.82-2.795zm10.947-.45a6.727 6.727 0 0 0-5.886.565c-1.538.911-1.258 1.063-.578 2.79a7.476 7.476 0 0 0 1.316 2.26 3.536 3.536 0 0 0 2.967 1.272 4.228 4.228 0 0 0 .43-.048 4.34 4.34 0 0 0 2.896-1.947 5.593 5.593 0 0 0 .684-1.44c.702-2.25.076-2.751-1.828-3.451z"
              fill-rule="evenodd"
              fill="#464449"
            ></path>
            <path
              d="M17.89 25.608c0-.638.984-.886 1.598 2.943a22.164 22.164 0 0 0 .956-4.813c1.162.225 2.278 2.848 1.927 5.148 3.166-.777 11.303-5.687 13.949-12.324 6.772 3.901 6.735 12.094 6.735 12.094s.358-1.9.558-3.516c.066-.538.293-.733.798-.213C48.073 17.343 42.3 5.75 31.297 5.57c-15.108-.246-17.03 16.114-13.406 20.039z"
              fill-rule="evenodd"
              fill="#8a5c42"
            ></path>
            <path
              d="M24.765 42.431a14.125 14.125 0 0 0 6.463 5.236l-4.208 6.144-5.917-9.78z"
              fill-rule="evenodd"
              fill="#fff"
            ></path>
            <path
              d="M37.682 42.431a14.126 14.126 0 0 1-6.463 5.236l4.209 6.144 5.953-9.668z"
              fill-rule="evenodd"
              fill="#fff"
            ></path>
            <circle fill="#434955" r=".839" cy="52.562" cx="31.223"></circle>
            <circle fill="#434955" r=".839" cy="56.291" cx="31.223"></circle>
            <path
              d="M41.997 24.737c1.784.712 1.719 1.581 1.367 1.841a2.886 2.886 0 0 0-.785 1.022 6.618 6.618 0 0 1-.582 2.086v-4.949zm-21.469 4.479a6.619 6.619 0 0 1-.384-1.615 2.748 2.748 0 0 0-.77-1.023c-.337-.249-.413-1.06 1.154-1.754z"
              fill-rule="evenodd"
              fill="#464449"
            ></path>
          </g>
        </g>
      </svg>
      <div
        class="absolute bg-sky-800 z-10 size-[60%] w-full group-hover:size-[1%] group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"
      ></div>
    </div>
  </div>
  <div class="headings *:text-center *:leading-4 my-1">
    <p class="text-xl font-serif font-semibold text-[#434955] mb-1">${customer.name}</p>
    <p class="text-sm font-semibold text-[#434955]">${customer.id}</p>
  </div>
  <div class="w-full items-center justify-center flex">
    <ul
      class="flex flex-col items-start gap-1  *:inline-flex *:gap-1 *:items-center *:justify-center   *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-6"
    >
      <li class="">
        <svg
          id="phone"
          viewBox="0 0 24 24"
          class="fill-stone-700 group-hover:fill-[#58b0e0] transition-all duration-[0.4s] me-2"
          height="15"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path
            d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"
          ></path>
        </svg>
        <p>${customer.phone}</p>
      </li>
      <li class="my-2">
        <svg
          class="fill-stone-700 group-hover:fill-[#58b0e0] transition-all duration-[0.4s] me-2"
          height="15"
          width="15"
          id="mail"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
            fill="#231f20"
          ></path>
          <path
            d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
            fill="#231f20"
          ></path>
        </svg>
        <p>${customer.email}</p>
      </li>

      <li >
        <svg
          id="map"
          viewBox="0 0 16 16"
          class="fill-stone-700 group-hover:fill-[#58b0e0] transition-all duration-[0.4s] me-2"
          height="15"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11 5-8.2 5-11-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
            fill="#444"
          ></path>
        </svg>
        <p>${customer.gendar}</p>
      </li>
    </ul>
  </div>

                </div>
            
            
            
            
            

            
            `;
      }

      function d_Chart(transactions, chartType) {
        const transactionDates = transactions.map((t) => t.date);
        const transactionAmounts = transactions.map((t) => t.amount);

        if (!CanvasEle) {
          console.error("Chart element not found");
          return;
        }
        const chartCanvas = CanvasEle.getContext("2d");

        if (chart) {
          chart.destroy();
        }

        chart = new Chart(chartCanvas, {
          type: chartType,
          data: {
            labels: transactionDates,
            datasets: [
              {
                label: "Transaction Amount",
                data: transactionAmounts,
                fill: true,
                borderColor: "#007bff",
                borderWidth: 2,
                hoverBackgroundColor: "#007bff",
                hoverBorderColor: "#007bff",
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              position: "top",
              labels: {
                fontColor: "#333",
                fontSize: 16,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    fontColor: "#333",
                    fontSize: 14,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: "rgba(200, 200, 200, 0.3)",
                  },
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#333",
                    fontSize: 14,
                  },
                },
              ],
            },
            tooltips: {
              enabled: true,
              mode: "nearest",
              intersect: false,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleFontColor: "#fff",
              bodyFontColor: "#fff",
              xPadding: 10,
              yPadding: 10,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
          },
        });
      }

      const toggleChart = document.getElementById("toggleChart");

      if (toggleChart) {
        toggleChart.addEventListener("click", () => {
          curType = curType === "bar" ? "line" : "bar";
          d_Chart(transactions, curType);
        });
      } else {
        // console.error('Toggle chart button not found');
      }
    }

    function pieChart() {
      const ctx = document.getElementById("myChart");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "M.Faragallah",
            "Aya Salah",
            "Mina Adel",
            "Sarah Reda",
            "Mohamed Sayed",
            "Hany Ali",
          ],
          datasets: [
            {
              label: "My First Dataset",
              data: Total,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(60, 205, 255)",
                "rgb(25, 205, 60)",
                "rgb(25, 26, 255)",
              ],
              hoverOffset: 160,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
})
