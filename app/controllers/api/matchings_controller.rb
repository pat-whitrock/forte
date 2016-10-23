class Api::MatchingsController < Api::BaseController
  def index
    matchings = Matching.all
    render json: matchings
  end

  def create
    matching = Matching.new matching_params
    if matching.save
      render json: matching
    end
  end

  def update
    matching = Matching.find params[:id]
    if matching.update_attributes matching_params
      render json: matching
    end
  end

  def destroy
    matching = Matching.find params[:id]
    matching.destroy
    render json: matching
  end

  def show
    matching = Matching.find params[:id]
    render json: matching
  end

  def matching_params
    params.require(:matching).permit(
      :instrument,
      :lesson_time,
      :student_id,
      :teacher_id,
    )
  end
end