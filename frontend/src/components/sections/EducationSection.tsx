export default function EducationSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Education & Certifications</h2>
        <div className="max-w-4xl mx-auto">
          
          {/* Education */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Master&apos;s of Science in Data Analytics</h4>
                  <p className="text-blue-600 font-semibold">Eastern University</p>
                </div>
                <span className="text-gray-500 font-medium">Expected Dec 2025</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Bachelor of Science in Industrial Engineering</h4>
                  <p className="text-blue-600 font-semibold">University of San Carlos, Philippines</p>
                  <p className="text-sm text-gray-600">Canadian Equivalency by ICES & WES</p>
                </div>
                <span className="text-gray-500 font-medium">2007</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Diploma Occupational/Physical Therapy Assistant</h4>
                  <p className="text-blue-600 font-semibold">Vancouver Community College</p>
                </div>
                <span className="text-gray-500 font-medium">2016</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Certifications</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Amazon Web Services (AWS) Certification</h4>
                <p className="text-blue-600 font-semibold mb-1">Artificial Intelligence Practitioner</p>
                <p className="text-gray-500">2025 - 2028</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Data Analytics Certificate</h4>
                <p className="text-blue-600 font-semibold mb-1">BrainStation IO Vancouver BC, Canada</p>
                <p className="text-gray-500">2024</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Data Engineering - Deep Learning</h4>
                <p className="text-blue-600 font-semibold mb-1">Deep Learning AI</p>
                <p className="text-gray-500">2025</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Data Analytics Certificate</h4>
                <p className="text-blue-600 font-semibold mb-1">DataCamp</p>
                <p className="text-gray-500">2024</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Disability Management Certificate</h4>
                <p className="text-blue-600 font-semibold mb-1">Pacific Coast University, BC, Canada</p>
                <p className="text-gray-500">2024</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Google Data Analytics Certificate</h4>
                <p className="text-blue-600 font-semibold mb-1">Google</p>
                <p className="text-gray-500">2022</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Fullstack Web Development</h4>
                <p className="text-blue-600 font-semibold mb-1">Udemy</p>
                <p className="text-gray-500">2021</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Sustainability Management Certificate</h4>
                <p className="text-blue-600 font-semibold mb-1">University of British Columbia</p>
                <p className="text-gray-500">2013</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}