import React from 'react'

function ExamCard({ ExaminationaData }) {
    return (
        <div className='page-card'>
            {ExaminationaData.map((item) => (
                <div className='card-data-type'>
                    <h5>{item.type}</h5>
                    <div className='flex-sec multi-card'>
                        {item.datas.map((content) => (
                            <p>{content.valueOne}</p>
                        ))}
                    </div>

                </div>
            ))
            }

        </div>
    )
}

export default ExamCard
