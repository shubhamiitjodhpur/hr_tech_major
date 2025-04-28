
// redeploi-app.js

document.addEventListener("DOMContentLoaded", () => {
  const userRoleSelector = document.getElementById("user-role-selector");
  const mainContent = document.getElementById("main-content");
  const sidebarNav = document.getElementById("sidebar-nav");

  const views = {
    "hr-admin": getHRAdminView,
    "employee": getEmployeeView,
    "manager": getManagerView
  };

  function renderView(role) {
    mainContent.innerHTML = "";
    sidebarNav.innerHTML = "";
    const viewContent = views[role]();
    mainContent.appendChild(viewContent.main);
    sidebarNav.innerHTML = viewContent.sidebar;
    drawCharts();
  }

  userRoleSelector.addEventListener("change", (e) => {
    renderView(e.target.value);
  });

  renderView(userRoleSelector.value);

  function getHRAdminView() {
    const main = document.createElement("div");

    main.innerHTML = `
      <div class="card">
        <h3>Talent Risk Overview</h3>
        <div class="heatmap">
          <div class="low-risk">Alice</div>
          <div class="medium-risk">Bob</div>
          <div class="high-risk">Charlie</div>
          <div class="low-risk">Diana</div>
          <div class="medium-risk">Edward</div>
        </div>
      </div>

      <div class="card">
        <h3>Success Metrics</h3>
        <canvas id="successMetricsChart" height="150"></canvas>
        <ul>
          <li>Avg. Redeployment Time: <strong>3 weeks</strong></li>
          <li>Total Cost Savings: <strong>$150,000</strong></li>
          <li>Employee Engagement: <strong>Improved by 15%</strong></li>
        </ul>
      </div>

      <div class="card">
        <h3>Upskilling Pathway</h3>
        <canvas id="upskillingChart" height="150"></canvas>
        <ul>
          <li>Alice - Cloud Computing (90%)</li>
          <li>Bob - Advanced Excel (60%)</li>
          <li>Charlie - Data Visualization (40%)</li>
        </ul>
      </div>

      <div class="card">
        <h3>Alerts & Notifications</h3>
        <ul>
          <li>Charlie requires immediate cloud certification training.</li>
          <li>Edward successfully matched to Business Analyst role.</li>
        </ul>
      </div>
    `;

    const sidebar = `
      <a href="#">Risk Overview</a>
      <a href="#">Job Matching</a>
      <a href="#">Upskilling</a>
      <a href="#">Success Metrics</a>
    `;

    return { main, sidebar };
  }

  function getEmployeeView() {
    const main = document.createElement("div");

    main.innerHTML = `
      <div class="card">
        <h3>Recommended Jobs</h3>
        <ul>
          <li>Product Manager - 85% Match - Remote - $90k/year</li>
          <li>Business Analyst - 78% Match - NYC - $85k/year</li>
          <li>Operations Specialist - 72% Match - Hybrid - $70k/year</li>
        </ul>
      </div>

      <div class="card">
        <h3>Skill Gap Tracker</h3>
        <p>Project Management</p>
        <div class="progress-bar"><div class="progress-fill" style="width: 70%;"></div></div>
        <p>SQL Programming</p>
        <div class="progress-bar"><div class="progress-fill" style="width: 50%;"></div></div>
        <p>Effective Communication</p>
        <div class="progress-bar"><div class="progress-fill" style="width: 90%;"></div></div>
      </div>

      <div class="card">
        <h3>Learning Resources</h3>
        <ul>
          <li>Udemy: SQL for Beginners - 50% Complete</li>
          <li>Coursera: Agile Foundations - 30% Complete</li>
          <li>LinkedIn Learning: Communication Mastery - 90% Complete</li>
        </ul>
      </div>

      <div class="card">
        <h3>My Redeployment Progress</h3>
        <ul>
          <li>Profile Updated - ✔️ Completed</li>
          <li>Internal Application Submitted - ✔️ Completed</li>
          <li>Interview Scheduled - 🔵 Pending</li>
          <li>Offer Pending Approval - 🔵 Pending</li>
        </ul>
      </div>
    `;

    const sidebar = `
      <a href="#">Job Matches</a>
      <a href="#">Skills Progress</a>
      <a href="#">Learning</a>
      <a href="#">My Redeployment</a>
    `;

    return { main, sidebar };
  }

  function getManagerView() {
    const main = document.createElement("div");

    main.innerHTML = `
      <div class="card">
        <h3>Team Overview</h3>
        <ul>
          <li>Alice - Low Risk</li>
          <li>Bob - Medium Risk</li>
          <li>Charlie - High Risk</li>
        </ul>
      </div>

      <div class="card">
        <h3>Skill Tracking</h3>
        <canvas id="skillDevelopmentChart" height="150"></canvas>
      </div>

      <div class="card">
        <h3>Redeployment Timeline</h3>
        <div class="timeline">
          <div class="timeline-event">
            <h4>Alice: Internal Job Offer Accepted</h4>
            <small>2 days ago</small>
          </div>
          <div class="timeline-event">
            <h4>Bob: Completed Upskilling Course</h4>
            <small>5 days ago</small>
          </div>
          <div class="timeline-event">
            <h4>Charlie: Final Interview Scheduled</h4>
            <small>Today</small>
          </div>
        </div>
      </div>
    `;

    const sidebar = `
      <a href="#">Team Members</a>
      <a href="#">Skill Tracking</a>
      <a href="#">Redeployment Timeline</a>
    `;

    return { main, sidebar };
  }

  function drawCharts() {
    if (document.getElementById("successMetricsChart")) {
      new Chart(document.getElementById("successMetricsChart"), {
        type: 'pie',
        data: {
          labels: ['Redeployed', 'Cost Savings', 'Engagement'],
          datasets: [{
            data: [65, 20, 15],
            backgroundColor: ['#4f46e5', '#10b981', '#f59e0b']
          }]
        }
      });
    }

    if (document.getElementById("upskillingChart")) {
      new Chart(document.getElementById("upskillingChart"), {
        type: 'bar',
        data: {
          labels: ['Cloud Computing', 'Advanced Excel', 'Data Visualization'],
          datasets: [{
            label: 'Upskilling Progress (%)',
            data: [90, 60, 40],
            backgroundColor: '#4f46e5'
          }]
        }
      });
    }

    if (document.getElementById("skillDevelopmentChart")) {
      new Chart(document.getElementById("skillDevelopmentChart"), {
        type: 'bar',
        data: {
          labels: ['Alice', 'Bob', 'Charlie'],
          datasets: [{
            label: 'Skill Progress (%)',
            data: [90, 70, 45],
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
          }]
        }
      });
    }
  }
});
