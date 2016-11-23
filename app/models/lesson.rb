# == Schema Information
#
# Table name: lessons
#
#  id          :integer          not null, primary key
#  is_paid     :boolean          default(FALSE), not null
#  feedback    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  start_time  :datetime
#  end_time    :datetime
#  price       :decimal(, )
#  matching_id :integer
#

class Lesson < ActiveRecord::Base

  scope :upcoming, -> { where("start_time >= ?", Date.today) }
  scope :recent, -> { where("start_time < ?", Date.today) }

  validates :start_time, presence: true, date: true
  validates :end_time, presence: true, date: { after: :start_time }
  validates :is_paid, :inclusion => { :in => [true, false] }
  validates :matching_id, presence: true

  belongs_to :matching
  has_one :student, through: :matching
  has_one :teacher, through: :matching

  def send_cancel_emails
    LessonMailer.cancel_notify_teacher(self).deliver_now
    LessonMailer.cancel_notify_student(self).deliver_now
    LessonMailer.cancel_notify_parent(self).deliver_now
  end

end
