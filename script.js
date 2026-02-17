let showPerHour = false;
let showStacks = false;

let farmModules = [
    {
        name: "Lox V7 Kelp Farm",
        stats: {
            type: "kelp",
            itemsPerSecond: 750000 / 3600,
            itemsPerMinute: 750000 / 60,
            itemsPerHour: 750000,

            resourcesPerSecondBones: 250000 / 3600,
            resourcesPerMinuteBones: 250000 / 60,
            resourcesPerHourBones: 250000,

            resourcesPerSecondBlaze: 70000 / 3600,
            resourcesPerMinuteBlaze: 70000 / 60,
            resourcesPerHourBlaze: 70000,

            estimatedProfitPerHour: 62500000
        }
    },
    {
        name: "Lox V11 Kelp Farm",
        stats: {
            type: "kelp",
            itemsPerSecond: 2595000 / 3600,
            itemsPerMinute: 2595000 / 60,
            itemsPerHour: 2595000,

            resourcesPerSecondBones: 865000 / 3600,
            resourcesPerMinuteBones: 865000 / 60,
            resourcesPerHourBones: 865000,

            resourcesPerSecondBlaze: 216250 / 3600,
            resourcesPerMinuteBlaze: 216250 / 60,
            resourcesPerHourBlaze: 216250,

            estimatedProfitPerHour: 216250000
        }
    },
    {
        name: "Jouan V1",
        stats: {
            type: "kelp",
            itemsPerSecond: 1013760 / 3600,
            itemsPerMinute: 1013760 / 60,
            itemsPerHour: 1013760,

            resourcesPerSecondBones: 337920 / 3600,
            resourcesPerMinuteBones: 337920 / 60,
            resourcesPerHourBones: 337920,

            resourcesPerSecondBlaze: 84480 / 3600,
            resourcesPerMinuteBlaze: 84480 / 60,
            resourcesPerHourBlaze: 84480,

            estimatedProfitPerHour: 84480000
        }
    },
    {
        name: "Lox V9 Kelp Farm",
        stats: {
            type: "kelp",
            itemsPerSecond: 1536000 / 3600,
            itemsPerMinute: 1536000 / 60,
            itemsPerHour: 1536000,

            resourcesPerSecondBones: 512000 / 3600,
            resourcesPerMinuteBones: 512000 / 60,
            resourcesPerHourBones: 512000,

            resourcesPerSecondBlaze: 127500 / 3600,
            resourcesPerMinuteBlaze: 127500 / 60,
            resourcesPerHourBlaze: 127500,

            estimatedProfitPerHour: 127440000
        }
    },
    {
        name: "Jouan V2",
        stats: {
            type: "kelp",
            itemsPerSecond: 2430000 / 3600,
            itemsPerMinute: 2430000 / 60,
            itemsPerHour: 2430000,

            resourcesPerSecondBones: 810000 / 3600,
            resourcesPerMinuteBones: 810000 / 60,
            resourcesPerHourBones: 810000,

            resourcesPerSecondBlaze: 203040 / 3600,
            resourcesPerMinuteBlaze: 203040 / 60,
            resourcesPerHourBlaze: 203040,

            estimatedProfitPerHour: 202500000   
        }
    },
    {
        name: "Lox V10 Kelp Farm",
        stats: {
            type: "kelp",
            itemsPerSecond: 2235000 / 3600,
            itemsPerMinute: 2235000 / 60,
            itemsPerHour: 2235000,

            resourcesPerSecondBones: 745000 / 3600,
            resourcesPerMinuteBones: 745000 / 60,
            resourcesPerHourBones: 745000,

            resourcesPerSecondBlaze: 190000 / 3600,
            resourcesPerMinuteBlaze: 190000 / 60,
            resourcesPerHourBlaze: 190000,

            estimatedProfitPerHour: 186250000
        }
    },
    {
        name: "Lox Starter Kelp Farm",
        stats: {
            type: "kelp",
            itemsPerSecond: 500000 / 3600, // fill if known
            itemsPerMinute: 500000 / 60,
            itemsPerHour: 500000,

            resourcesPerSecondBones: 166666 / 3600,
            resourcesPerMinuteBones: 166666 / 60,
            resourcesPerHourBones: 166666,

            resourcesPerSecondBlaze: 466666 / 3600,
            resourcesPerMinuteBlaze: 46666 / 60,
            resourcesPerHourBlaze: 46666,

            estimatedProfitPerHour: 41666666
        }
    }
];

// ---------------------------
// FIX: Define the missing function
function showSkeleton() {
    const calculator = document.getElementById("calculator");
    if (calculator) {
        calculator.style.display = "block";  // make it visible
        calculator.style.opacity = "1";      // ensure it's not transparent
        calculator.style.position = "relative"; // default positioning
        calculator.style.zIndex = "10";      // make sure it's above other elements
    }

    // Reset input/results
    const input = document.getElementById("spawnerInput");
    const result = document.getElementById("result");
    const progressBar = document.getElementById("progressBar");
    if (input) input.value = "";
    if (result) result.innerText = "";
    if (progressBar) progressBar.style.width = "0%";
}


// Make sure the button actually calls this
document.addEventListener("DOMContentLoaded", () => {
    const skeletonBtn = document.getElementById("skeletonBtn");
    if (skeletonBtn) {
        skeletonBtn.addEventListener("click", showSkeleton);
    }
    const dashboardBackBtn = document.getElementById("dashboardBackBtn");
    if (dashboardBackBtn) {
        dashboardBackBtn.addEventListener("click", () => {
            document.getElementById("farmDashboardSection").style.display = "none";
            document.getElementById("homeSection").style.display = "block";
            location.hash = "#home"; // keeps URL hash consistent
        });
    }

});


// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Dashboard farm type buttons (All / Kelp)
    const dashboardTypeButtons = document.querySelectorAll(".dashboard-type-btn");

    dashboardTypeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            dashboardTypeButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            renderFarmTable(); // instantly update table
        });
    });

    const toggleBtn = document.getElementById("toggleBtn");
    const themeIcon = document.getElementById("themeIcon");
    const spawnerBtn = document.getElementById("spawnerBtn");
    const farmBtn = document.getElementById("farmBtn");
    const spawnerInput = document.getElementById("spawnerInput");
    const rateToggle = document.getElementById("rateToggle");
    const stackToggle = document.getElementById("stackToggle");

    const farmSection = document.getElementById("farmSection");
    const farmSearch = document.getElementById("farmSearch");
    const farmSuggestions = document.getElementById("farmSuggestions");
    const farmStats = document.getElementById("farmStats");
    const farmContent = document.getElementById("farmContent");
    const farmTypeButtons = document.querySelectorAll(".dashboard-type-btn");
    // Spawner button event
    const skeletonBtn = document.getElementById("skeletonBtn");
    if (skeletonBtn) {
        skeletonBtn.addEventListener("click", showSkeleton);
}


    let selectedFarmType = "all";

    // Clear type selection when search is used
    if (farmSearch) {
        let selectedIndex = -1;

        farmSearch.addEventListener("input", () => {
            const query = farmSearch.value.toLowerCase();
            farmSuggestions.innerHTML = "";

            if (!query) return;

            const matches = farmModules.filter(f => f.name.toLowerCase().includes(query));

            matches.forEach((farm, i) => {
                const li = document.createElement("li");
                li.style.padding = "6px 12px";
                li.style.cursor = "pointer";

                // Highlight matching letters
                const regex = new RegExp(`(${query})`, "ig");
                li.innerHTML = farm.name.replace(regex, "<span style='background: #6366f1; color: white;'>$1</span>");

                li.addEventListener("click", () => {
                    farmSearch.value = farm.name;
                    showFarmStats(farm);
                    farmSuggestions.innerHTML = "";
                });

                farmSuggestions.appendChild(li);
            });

            selectedIndex = -1; // reset selection
        });

        farmSearch.addEventListener("keydown", (e) => {
            const items = farmSuggestions.querySelectorAll("li");
            if (!items.length) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % items.length;
                highlightSuggestion(items, selectedIndex);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                highlightSuggestion(items, selectedIndex);
            } else if (e.key === "Tab") {
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    const selected = items[selectedIndex];
                    farmSearch.value = selected.textContent;
                    const match = farmModules.find(m => m.name === selected.textContent);
                    if (match) showFarmStats(match);
                    farmSuggestions.innerHTML = "";
                }
            }
        });

        function highlightSuggestion(items, index) {
            items.forEach((item, i) => {
                if (i === index) {
                    item.style.background = "rgba(99,102,241,0.3)";
                    item.style.color = "white";
                } else {
                    item.style.background = "transparent";
                    item.style.color = "inherit";
                }
            });
        }
    }


    // ---------------------------
    // Farm search autocomplete
    // ---------------------------
    if (farmSearch) {
        let selectedIndex = -1;
        farmSearch.addEventListener("keydown", (e) => {
            const items = farmSuggestions.querySelectorAll("li");
            if (!items.length) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % items.length;
                highlightSuggestion(items, selectedIndex);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                highlightSuggestion(items, selectedIndex);
            } else if (e.key === "Tab") {
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    const selected = items[selectedIndex];
                    farmSearch.value = selected.textContent;
                    const match = farmModules.find(m => m.name === selected.textContent);
                    if (match) showFarmStats(match);
                    farmSuggestions.innerHTML = "";
                }
            }
        });

        function highlightSuggestion(items, index) {
            items.forEach((item, i) => {
                if (i === index) {
                    item.style.background = "rgba(99,102,241,0.3)";
                    item.style.color = "white";
                } else {
                    item.style.background = "transparent";
                    item.style.color = "inherit";
                }
            });
        }
    }

    // ---------------------------
    // Theme toggle
    // ---------------------------
    let mode = localStorage.getItem("theme") || "dark";
    document.body.classList.add(mode);
    themeIcon.textContent = (mode === "light") ? "☀️" : "🌙";

    toggleBtn.addEventListener("click", () => {
        themeIcon.classList.add("spin");
        setTimeout(() => {
            if (document.body.classList.contains("dark")) {
                document.body.classList.replace("dark", "light");
                localStorage.setItem("theme", "light");
                themeIcon.textContent = "☀️";
            } else {
                document.body.classList.replace("light", "dark");
                localStorage.setItem("theme", "dark");
                themeIcon.textContent = "🌙";
            }
            themeIcon.classList.remove("spin");
        }, 250);
    });

    spawnerBtn.addEventListener("click", () => { location.hash = "#spawner"; });

    window.addEventListener("hashchange", updateView);
    if (!location.hash) location.hash = "#home";
    updateView();

    if (spawnerInput) spawnerInput.addEventListener("input", calculate);

    if (rateToggle) {
        rateToggle.addEventListener("click", () => {
            showPerHour = !showPerHour;
            rateToggle.textContent = showPerHour
                ? "Switch to Bones / Minute"
                : "Switch to Bones / Hour";
            calculate();
        });
    }

    if (stackToggle) {
        stackToggle.addEventListener("click", () => {
            showStacks = !showStacks;
            stackToggle.textContent = showStacks ? "Show Raw Numbers" : "Show in Stacks";
            calculate();
        });
    }

    // Dashboard filters
    const filterSelect = document.getElementById("filterSelect");
    const dashboardSearch = document.getElementById("farmSearchDashboard");
    if (filterSelect) filterSelect.addEventListener("change", renderFarmTable);
    if (dashboardSearch) dashboardSearch.addEventListener("input", renderFarmTable);
});

// ---------------------------
// OTHER FUNCTIONS
// ---------------------------
function updateView() {
    const home = document.getElementById("homeSection");
    const spawner = document.getElementById("spawnerSection");
    const farm = document.getElementById("farmSection");
    const dashboard = document.getElementById("farmDashboardSection");

    // Hide all sections first
    if (home) home.style.display = "none";
    if (spawner) spawner.style.display = "none";
    if (farm) farm.style.display = "none";
    if (dashboard) dashboard.style.display = "none";

    // Show correct section based on hash
    if (location.hash === "#spawner") {
        spawner.style.display = "block";
    } 
    else if (location.hash === "#farm") {
        farm.style.display = "block";
    } 
    else if (location.hash === "#dashboard") {
        dashboard.style.display = "block";
        renderFarmTable();

        // 🔥 THIS is the missing part
        // Always refresh table when dashboard opens
        renderFarmTable();
    } 
    else {
        home.style.display = "block";
    }
}


// ---------------------------
// SPAWNER CALCULATOR
// ---------------------------
function calculate() {
    const input = document.getElementById("spawnerInput");
    const result = document.getElementById("result");
    const progressBar = document.getElementById("progressBar");

    const spawners = parseFloat(input.value);
    if (isNaN(spawners) || spawners < 0 || !Number.isInteger(spawners)) {
        result.innerText = "Please enter a valid whole number of spawners.";
        progressBar.style.width = "0%";
        return;
    }

    const bonesPerMinute = 1500 * (1 - Math.exp(-0.00138 * spawners));
    const bonesPerHour = bonesPerMinute * 60;

    let total, stacks, remainder, percent;

    if (showPerHour) {
        total = bonesPerHour;
        percent = Math.min((bonesPerHour / 90000) * 100, 100);
    } else {
        total = bonesPerMinute;
        percent = Math.min((bonesPerMinute / 1500) * 100, 100);
    }

    stacks = Math.floor(total / 64);
    remainder = Math.floor(total % 64);

    if (showStacks) {
        result.innerText = (showPerHour ? `Bones per hour: ` : `Bones per minute: `) +
            `${stacks} stacks + ${remainder}`;
    } else {
        result.innerText = (showPerHour ? `Bones per hour: ` : `Bones per minute: `) +
            `${total.toFixed(2)}`;
    }

    progressBar.style.width = percent + "%";
}

function resetCalculator() {
    const calc = document.getElementById("calculator");
    const input = document.getElementById("spawnerInput");
    const result = document.getElementById("result");
    const progressBar = document.getElementById("progressBar");
    const rateToggle = document.getElementById("rateToggle");
    const stackToggle = document.getElementById("stackToggle");

    calc.classList.remove("show");
    setTimeout(() => { calc.style.display = "none"; }, 300);

    input.value = "";
    result.innerText = "";
    progressBar.style.width = "0%";

    showPerHour = false;
    if (rateToggle) rateToggle.textContent = "Switch to Bones / Hour";

    showStacks = false;
    if (stackToggle) stackToggle.textContent = "Show in Stacks";
}

function goBack() {
    document.getElementById("spawnerSection").style.display = "none";
    document.getElementById("farmDashboardSection").style.display = "none";
    document.getElementById("homeSection").style.display = "block";
    resetCalculator();
}

// ---------------------------
// FARM DASHBOARD TABLE
// ---------------------------
function renderFarmTable() {
    const selectedTypeBtn = document.querySelector(".dashboard-type-btn.selected");
    const selectedFarmType = selectedTypeBtn ? selectedTypeBtn.dataset.type : "all";
    const container = document.getElementById("farmTableContainer");
    if (!container) return;

    const searchInput = document.getElementById("farmSearchDashboard");
    const filterSelect = document.getElementById("filterSelect");

    const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";
    const filter = filterSelect ? filterSelect.value : "all";

    // Start with ALL farms
    let farms = [...farmModules];

    // Apply farm type filter (All / Kelp)
    if (selectedFarmType !== "all") {
        farms = farms.filter(f => f.stats.type === selectedFarmType);
    }

    // 🔎 Search
    if (searchQuery) {
        farms = farms.filter(f =>
            f.name.toLowerCase().includes(searchQuery)
        );
    }

    // 🎯 Correct filter/sort logic
    // 🎯 Correct sorting logic
    if (filter === "all") {
        // A → Z alphabetical
        farms.sort((a, b) => a.name.localeCompare(b.name));
    } 
    else if (filter === "bones") {
        // Highest bone usage first
        farms.sort((a, b) => 
            b.stats.resourcesPerHourBones - a.stats.resourcesPerHourBones
        );
    } 
    else if (filter === "blaze") {
        // Highest blaze usage first
        farms.sort((a, b) => 
            b.stats.resourcesPerHourBlaze - a.stats.resourcesPerHourBlaze
        );
    } 
    else if (filter === "profit") {
        // Highest profit first
        farms.sort((a, b) => 
            b.stats.estimatedProfitPerHour - a.stats.estimatedProfitPerHour
        );
    }


    if (farms.length === 0) {
        container.innerHTML = "<p style='opacity:0.7;'>No farms found.</p>";
        return;
    }

    let html = `
        <div style="
            max-height: 420px;
            overflow-y: auto;
            border-radius: 14px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 8px 30px rgba(0,0,0,0.25);
        ">
            <table style="
                width:100%;
                border-collapse: collapse;
                font-family: 'Segoe UI', sans-serif;
                text-align: center;
            ">
                <thead>
                    <tr style="
                        position: sticky;
                        top: 0;
                        background: linear-gradient(90deg, #6366f1, #8b5cf6);
                        color: white;
                        font-size: 15px;
                        letter-spacing: 0.5px;
                    ">
                        <th style="padding:14px;">Farm</th>
                        <th style="padding:14px;">Items / hr</th>
                        <th style="padding:14px;">Bones / hr 🦴</th>
                        <th style="padding:14px;">Blaze / hr 🔥</th>
                        <th style="padding:14px;">Profit / hr 💰</th>
                    </tr>
                </thead>
                <tbody>
    `;

    farms.forEach((f, index) => {
        const rowBg = index % 2 === 0
            ? "rgba(255,255,255,0.03)"
            : "rgba(255,255,255,0.06)";

        // Profit color highlight
        let profitColor = "#22c55e";
        if (f.stats.estimatedProfitPerHour < 30000000) profitColor = "#facc15";
        if (f.stats.estimatedProfitPerHour < 10000000) profitColor = "#ef4444";

        html += `
            <tr style="
                background:${rowBg};
                transition: all 0.15s ease;
            " onmouseover="this.style.background='rgba(99,102,241,0.15)'" 
               onmouseout="this.style.background='${rowBg}'">
                <td style="padding:12px; font-weight:600;">
                    ${f.name}
                </td>
                <td style="padding:12px;">
                    ${f.stats.itemsPerHour.toLocaleString()}
                </td>
                <td style="padding:12px; color:#93c5fd; font-weight:500;">
                    ${f.stats.resourcesPerHourBones.toLocaleString()}
                </td>
                <td style="padding:12px; color:#f97316; font-weight:500;">
                    ${f.stats.resourcesPerHourBlaze.toLocaleString()}
                </td>
                <td style="
                    padding:12px;
                    font-weight:700;
                    color:${profitColor};
                ">
                    $${f.stats.estimatedProfitPerHour.toLocaleString()}
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = html;
}


// ---------------------------
// FARM PROFIT CALCULATOR (Bones + Blaze Auto Input)
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const farmSelect = document.getElementById("farmSelect");
    const bonePriceInput = document.getElementById("bonePriceInput");
    const blazePriceInput = document.getElementById("blazePriceInput");
    const profitOutput = document.getElementById("profitOutput");

    if (!farmSelect) return;


    function populateFarmSelect() {
        const farmSelect = document.getElementById("farmSelect");
        if (!farmSelect) return;

        // Clear all options
        farmSelect.innerHTML = "";

        // Add placeholder
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Select Farm";
        farmSelect.appendChild(placeholder);

        // Use Map to remove duplicates
        const uniqueFarms = [...new Map(farmModules.map(f => [f.name, f])).values()];

        uniqueFarms.forEach((farm, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = farm.name;
            farmSelect.appendChild(option);
        });
    }




    function calculateFarmProfit() {
        const farmIndex = farmSelect.value;
        const bonePrice = parseFloat(bonePriceInput.value);
        const blazePrice = parseFloat(blazePriceInput.value);

        if (farmIndex === "" || isNaN(bonePrice) || isNaN(blazePrice)) {
            profitOutput.innerText = "Enter prices and select a farm.";
            return;
        }

        const farm = farmModules[farmIndex];
        const stats = farm.stats;

        // Auto resource cost calculation
        const boneCostPerHour = stats.resourcesPerHourBones * bonePrice;
        const blazeCostPerHour = stats.resourcesPerHourBlaze * blazePrice;
        const totalCostPerHour = boneCostPerHour + blazeCostPerHour;

        // Real profit = estimated profit - resource costs
        const realProfitPerHour = stats.estimatedProfitPerHour - totalCostPerHour;

        profitOutput.innerHTML = `
            💰 Real Profit / hr: $${realProfitPerHour.toLocaleString()}<br>
            📉 Cost / hr: $${totalCostPerHour.toLocaleString()}<br>
            📊 Net Profit / hr: $${realProfitPerHour.toLocaleString()}
        `;
    }

    farmSelect.addEventListener("change", calculateFarmProfit);
    bonePriceInput.addEventListener("input", calculateFarmProfit);
    blazePriceInput.addEventListener("input", calculateFarmProfit);
});
// ---------------------------
// BEST FARM FOR MY BUDGET FINDER
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const budgetInput = document.getElementById("budgetInput");
    const bonePriceBudget = document.getElementById("bonePriceBudget");
    const blazePriceBudget = document.getElementById("blazePriceBudget");
    const bestFarmOutput = document.getElementById("bestFarmOutput");

    if (!budgetInput || !bonePriceBudget || !blazePriceBudget) return;

    function findBestFarm() {
        const budget = parseFloat(budgetInput.value);
        const bonePrice = parseFloat(bonePriceBudget.value);
        const blazePrice = parseFloat(blazePriceBudget.value);

        if (isNaN(budget) || isNaN(bonePrice) || isNaN(blazePrice)) {
            bestFarmOutput.innerText = "Enter money, bone price, and blaze price.";
            return;
        }

        let bestFarm = null;
        let bestProfit = -Infinity;
        let bestCost = 0;

        farmModules.forEach(farm => {
            const stats = farm.stats;

            // Cost per hour (resources)
            const boneCost = stats.resourcesPerHourBones * bonePrice;
            const blazeCost = stats.resourcesPerHourBlaze * blazePrice;
            const totalResourceCost = boneCost + blazeCost;

            // Real profit after costs
            const realProfit = stats.estimatedProfitPerHour - totalResourceCost;

            // Assume farm "build cost" = 1 hour of resource usage (simple realistic estimate)
            const estimatedStartupCost = totalResourceCost;

            // Check if user can afford it
            if (budget >= estimatedStartupCost) {
                if (realProfit > bestProfit) {
                    bestProfit = realProfit;
                    bestFarm = farm;
                    bestCost = totalResourceCost;
                }
            }
        });

        if (!bestFarm) {
            bestFarmOutput.innerHTML = "❌ No farm fits your budget.";
            return;
        }

        bestFarmOutput.innerHTML = `
            🏆 Best Farm: <b>${bestFarm.name}</b><br>
            💰 Real Profit / hr: $${bestProfit.toLocaleString()}<br>
            📉 Resource Cost / hr: $${bestCost.toLocaleString()}<br>
            🚀 Recommendation: Maximum profit for your budget
        `;
    }

    budgetInput.addEventListener("input", findBestFarm);
    bonePriceBudget.addEventListener("input", findBestFarm);
    blazePriceBudget.addEventListener("input", findBestFarm);
    populateFarmSelect();
});
// ---------------------------
// EXPANDABLE CALCULATORS + LOGIC
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const profitToggle = document.getElementById("profitCalcToggle");
    const profitContainer = document.getElementById("profitCalcContainer");

    const bestToggle = document.getElementById("bestFarmToggle");
    const bestContainer = document.getElementById("bestFarmContainer");

    const farmSelect = document.getElementById("farmSelect");
    const bonePrice = document.getElementById("bonePrice");
    const blazePrice = document.getElementById("blazePrice");
    const profitOutput = document.getElementById("profitOutput");

    const budgetInput = document.getElementById("budgetInput");
    const bonePriceBudget = document.getElementById("bonePriceBudget");
    const blazePriceBudget = document.getElementById("blazePriceBudget");
    const bestFarmOutput = document.getElementById("bestFarmOutput");

    // ---------------------------
    // Expand / Collapse Toggles (no design change)
    // ---------------------------
    if (profitToggle && profitContainer) {
        profitToggle.addEventListener("click", () => {
            profitContainer.style.display =
                profitContainer.style.display === "none" ? "block" : "none";
        });
    }

    if (bestToggle && bestContainer) {
        bestToggle.addEventListener("click", () => {
            bestContainer.style.display =
                bestContainer.style.display === "none" ? "block" : "none";
        });
    }

    // ---------------------------
    // Populate Farm Dropdown Automatically
    // ---------------------------
    if (farmSelect) {
        farmModules.forEach((farm, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = farm.name;
            farmSelect.appendChild(option);
        });
    }

    // ---------------------------
    // FARM PROFIT CALCULATOR
    // ---------------------------
    function calculateFarmProfit() {
        if (!farmSelect || !bonePrice || !blazePrice) return;

        const farmIndex = farmSelect.value;
        const bone = parseFloat(bonePrice.value);
        const blaze = parseFloat(blazePrice.value);

        if (farmIndex === "" || isNaN(bone) || isNaN(blaze)) {
            profitOutput.innerText = "Enter prices and select a farm.";
            return;
        }

        const farm = farmModules[farmIndex];
        const stats = farm.stats;

        const boneCost = stats.resourcesPerHourBones * bone;
        const blazeCost = stats.resourcesPerHourBlaze * blaze;
        const totalCost = boneCost + blazeCost;
        const realProfit = stats.estimatedProfitPerHour - totalCost;

        profitOutput.innerHTML = `
            💰 Real Profit / hr: $${realProfit.toLocaleString()}<br>
            📉 Cost / hr: $${totalCost.toLocaleString()}<br>
            📊 Net Profit: $${realProfit.toLocaleString()}
        `;
    }

    farmSelect?.addEventListener("change", calculateFarmProfit);
    bonePrice?.addEventListener("input", calculateFarmProfit);
    blazePrice?.addEventListener("input", calculateFarmProfit);

    // ---------------------------
    // BEST FARM FOR MY BUDGET FINDER
    // ---------------------------
    function findBestFarm() {
        const budget = parseFloat(budgetInput?.value);
        const bone = parseFloat(bonePriceBudget?.value);
        const blaze = parseFloat(blazePriceBudget?.value);

        if (isNaN(budget) || isNaN(bone) || isNaN(blaze)) {
            bestFarmOutput.innerText = "Enter money, bone price, and blaze price.";
            return;
        }

        let bestFarm = null;
        let bestProfit = -Infinity;
        let bestCost = 0;

        farmModules.forEach(farm => {
            const stats = farm.stats;

            const boneCost = stats.resourcesPerHourBones * bone;
            const blazeCost = stats.resourcesPerHourBlaze * blaze;
            const totalCost = boneCost + blazeCost;
            const realProfit = stats.estimatedProfitPerHour - totalCost;

            if (budget >= totalCost && realProfit > bestProfit) {
                bestProfit = realProfit;
                bestFarm = farm;
                bestCost = totalCost;
            }
        });

        if (!bestFarm) {
            bestFarmOutput.innerText = "❌ No farm fits your budget.";
            return;
        }

        bestFarmOutput.innerHTML = `
            🏆 Best Farm: <b>${bestFarm.name}</b><br>
            💰 Real Profit / hr: $${bestProfit.toLocaleString()}<br>
            📉 Resource Cost / hr: $${bestCost.toLocaleString()}
        `;
    }

    budgetInput?.addEventListener("input", findBestFarm);
    bonePriceBudget?.addEventListener("input", findBestFarm);
    blazePriceBudget?.addEventListener("input", findBestFarm);
});
