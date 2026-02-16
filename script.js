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

            estimatedProfitPerHour: 216000000
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

            estimatedProfitPerHour: 25000000
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
});


// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
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
    const farmTypeButtons = document.querySelectorAll(".farm-type-btn");
    // Spawner button event
    const skeletonBtn = document.getElementById("skeletonBtn");
    if (skeletonBtn) {
        skeletonBtn.addEventListener("click", showSkeleton);
}


    let selectedFarmType = "all";

    // ---------------------------
    // Farm type selection buttons
    // ---------------------------
    farmTypeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            farmTypeButtons.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedFarmType = btn.dataset.type;
            showFilteredFarms();
        });
    });

    function showFilteredFarms() {
        let filtered = farmModules;
        if (selectedFarmType !== "all") {
            filtered = farmModules.filter(farm => farm.stats.type === selectedFarmType);
        }

        if (filtered.length === 0) {
            farmStats.innerHTML = "<p>No farms of this type available.</p>";
            return;
        }

        // Show farm content and first farm by default
        farmContent.style.display = "block";
        showFarmStats(filtered[0]);
    }

    // Clear type selection when search is used
    if (farmSearch) {
        farmSearch.addEventListener("input", () => {
            selectedFarmType = "all";
            farmTypeButtons.forEach(b => b.classList.remove("selected"));
        });
    }

    // ---------------------------
    // Farm search autocomplete
    // ---------------------------
    if (farmSearch) {
        let selectedIndex = -1;

        farmSearch.addEventListener("input", () => {
            const query = farmSearch.value.toLowerCase();
            farmSuggestions.innerHTML = "";
            selectedIndex = -1;

            if (!query) return;

            // Filter by query & type, then alphabetical
            let matches = farmModules
                .filter(farm => farm.name.toLowerCase().includes(query))
                .sort((a, b) => a.name.localeCompare(b.name));

            matches.forEach((module, index) => {
                const li = document.createElement("li");
                li.textContent = module.name;
                li.style.cursor = "pointer";
                li.style.padding = "5px";

                li.addEventListener("click", () => {
                    farmSearch.value = module.name;
                    showFarmStats(module);
                    farmSuggestions.innerHTML = "";
                });

                farmSuggestions.appendChild(li);
            });
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

    if (farmBtn) {
        farmBtn.addEventListener("click", () => {
            document.getElementById("homeSection").style.display = "none";
            farmSection.style.display = "block";
            farmSearch.value = "";
            farmStats.innerHTML = "";
            farmSuggestions.innerHTML = "";
            farmContent.style.display = "none"; // hide content until type selected
        });
    }

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
    const hash = location.hash;

    const home = document.getElementById("homeSection");
    const spawner = document.getElementById("spawnerSection");
    const farm = document.getElementById("farmSection");
    const dashboard = document.getElementById("farmDashboardSection");

    home.style.display = "none";
    spawner.style.display = "none";
    farm.style.display = "none";
    dashboard.style.display = "none";

    if (hash === "#spawner") spawner.style.display = "block";
    else if (hash === "#farm") farm.style.display = "block";
    else if (hash === "#dashboard") dashboard.style.display = "block";
    else {
        home.style.display = "block";
        resetCalculator();
    }
}

function showFarmStats(module) {
    const stats = module.stats;
    const farmStats = document.getElementById("farmStats");

    farmStats.innerHTML = `
        <h3 style="margin-bottom:10px;">${module.name}</h3>
        <table style="width:100%; border-collapse: collapse; font-family: 'Segoe UI', sans-serif;">
            <thead>
                <tr style="background: rgba(99,102,241,0.3); color: white;">
                    <th style="text-align:left; padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Metric</th>
                    <th style="text-align:right; padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Per Second</th>
                    <th style="text-align:right; padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Per Minute</th>
                    <th style="text-align:right; padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Per Hour</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background: rgba(255,255,255,0.05);">
                    <td style="padding:6px;">Items Produced</td>
                    <td style="text-align:right; padding:6px;">${stats.itemsPerSecond.toFixed(2)}</td>
                    <td style="text-align:right; padding:6px;">${stats.itemsPerMinute.toFixed(2)}</td>
                    <td style="text-align:right; padding:6px;">${stats.itemsPerHour.toLocaleString()}</td>
                </tr>
                <tr style="background: rgba(255,255,255,0.1);">
                    <td style="padding:6px;">Bones Used</td>
                    <td style="text-align:right; padding:6px;">${stats.resourcesPerSecondBones.toFixed(2)}</td>
                    <td style="text-align:right; padding:6px;">${stats.resourcesPerMinuteBones.toFixed(2)}</td>
                    <td style="text-align:right; padding:6px;">${stats.resourcesPerHourBones.toLocaleString()}</td>
                </tr>
                <tr style="background: rgba(255,255,255,0.05);">
                    <td style="padding:6px;">Blaze Rods Used</td>
                    <td style="text-align:right; padding:6px;">${stats.resourcesPerSecondBlaze.toFixed(2)}</td>
                    <td style="text-align:right; padding:6px;">${stats.resourcesPerMinuteBlaze.toFixed(2)}</td>
                    <td style="text-align:right; padding:6px;">${stats.resourcesPerHourBlaze.toLocaleString()}</td>
                </tr>
                <tr style="background: rgba(255,255,255,0.1); font-weight:bold;">
                    <td style="padding:6px;">Estimated Profit</td>
                    <td colspan="3" style="text-align:right; padding:6px;">${stats.estimatedProfitPerHour.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    `;
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
    const container = document.getElementById("farmTableContainer");
    if (!container) return;

    const searchInput = document.getElementById("farmSearchDashboard");
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";

    const filterSelect = document.getElementById("filterSelect");
    const filter = filterSelect ? filterSelect.value : "all";

    let filteredFarms = farmModules.filter(farm =>
        farm.name.toLowerCase().includes(searchQuery)
    );

    if (filter === "bones") filteredFarms = filteredFarms.filter(farm => farm.stats.resourcesPerHourBones > 0);
    if (filter === "blaze") filteredFarms = filteredFarms.filter(farm => farm.stats.resourcesPerHourBlaze > 0);
    if (filter === "profit") filteredFarms = filteredFarms.sort((a,b) => b.stats.estimatedProfitPerHour - a.stats.estimatedProfitPerHour);

    if (filteredFarms.length === 0) {
        container.innerHTML = "<p>No farms match your search/filter.</p>";
        return;
    }

    let tableHTML = `
        <table style="width:100%; border-collapse: collapse; font-family: 'Segoe UI', sans-serif;">
            <thead>
                <tr style="background: rgba(99,102,241,0.3); color: white;">
                    <th style="padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Farm Name</th>
                    <th style="padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Items / Hour</th>
                    <th style="padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Bones / Hour</th>
                    <th style="padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Blaze / Hour</th>
                    <th style="padding:8px; border-bottom: 2px solid rgba(255,255,255,0.3);">Profit / Hour</th>
                </tr>
            </thead>
            <tbody>
    `;

    filteredFarms.forEach((farm, i) => {
        const rowColor = i % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)";
        tableHTML += `
            <tr style="background:${rowColor};">
                <td style="padding:6px;">${farm.name}</td>
                <td style="text-align:right; padding:6px;">${farm.stats.itemsPerHour.toLocaleString()}</td>
                <td style="text-align:right; padding:6px;">${farm.stats.resourcesPerHourBones.toLocaleString()}</td>
                <td style="text-align:right; padding:6px;">${farm.stats.resourcesPerHourBlaze.toLocaleString()}</td>
                <td style="text-align:right; padding:6px;">${farm.stats.estimatedProfitPerHour.toLocaleString()}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}
