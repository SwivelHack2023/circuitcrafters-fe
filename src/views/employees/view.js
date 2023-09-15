import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFetchEmployees } from 'src/hooks/useEmployees'
import { useFetchEmployeeTasks } from 'src/hooks/useJira'
import { useFetchEmployeeMatrix } from 'src/hooks/useSonar'
import { CCard, CCardBody, CCardFooter, CCol, CProgress, CRow, CWidgetStatsD } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cil3d } from '@coreui/icons'
function ViewEmployee() {
  let params = useParams()
  const { isLoading } = useFetchEmployees()

  const { employees } = useSelector((state) => state.employee)

  // Use the Array.prototype.find() method to filter the employee by id
  const selectedEmployee = employees.find((employee) => employee.id === params.id)

  //   useFetchEmployeeTasks(selectedEmployee?.email)
  //   useFetchEmployeeMatrix(selectedEmployee?.email)

  const {
    tasks,
    bugCount,
    storyCount,
    estimatedTimeSum,
    progressTimeSum,
    totalTimeSum,
    percentSum,
    bugPercentage,
    storyPercentage,
  } = useSelector((state) => state.jira)

  const { matrix } = useSelector((state) => state.sonar)
  const estimatedTimesInHours = []
  const totalTimesInHours = []
  const issueNames = []

  for (const item of tasks) {
    const estimatedHours = parseFloat(item.estimatedTime) / 3600
    const totalHours = parseFloat(item.totalTime) / 3600

    estimatedTimesInHours.push(estimatedHours)
    totalTimesInHours.push(totalHours)
    issueNames.push(item.issueId)
  }

  const repos = matrix.map((item) => {
    const matrixArray = Object.entries(item.matrix).map(([title, value]) => ({
      title,
      value,
    }))

    return {
      repositoryName: item.repositoryName,
      matrix: matrixArray,
    }
  })
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Jira
              </h4>
              <div className="small text-medium-emphasis">Task Summery</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: issueNames,
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: estimatedTimesInHours,
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: totalTimesInHours,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Stories</div>
              <strong>
                {storyCount} Stories ({storyPercentage}%)
              </strong>
              <CProgress thin className="mt-2" color={'success'} value={storyPercentage} />
            </CCol>

            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Bugs</div>
              <strong>
                {bugCount} Bugs ({bugPercentage}%)
              </strong>
              <CProgress thin className="mt-2" color={'danger'} value={bugPercentage} />
            </CCol>

            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Average Estimated Time </div>
              <strong>{(estimatedTimeSum / 3600).toFixed(2)}h</strong>
            </CCol>

            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Average Progress Time </div>
              <strong>{(progressTimeSum / 3600).toFixed(2)}h</strong>
            </CCol>
            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Task Complete Ratio</div>
              <strong>{percentSum.toFixed(2)}%</strong>
              <CProgress thin className="mt-2" color={'danger'} value={percentSum} />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Sonar
              </h4>
              <div className="small text-medium-emphasis">Repo Matrix Summery</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <CRow>
            <CCol sm={6} lg={3}>
              {repos.map((data, key) => {
                return (
                  <CWidgetStatsD
                    key={key}
                    className="mb-4"
                    color="warning"
                    icon={
                      <>
                        <CIcon icon={cil3d} height={52} className="my-4 text-white" />
                        <h6 className="my-4 text-white">{data.repositoryName}</h6>
                      </>
                    }
                    values={data.matrix}
                  />
                )
              })}
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default ViewEmployee
