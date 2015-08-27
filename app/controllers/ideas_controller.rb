class IdeasController < ApplicationController
  def index
    @idea  = Idea.new
    @ideas = Idea.order(created_at: :desc)
  end

  def create
    idea = Idea.create(idea_params)

    render partial: "ideas/idea", locals: {idea: idea}
  end

  def edit
    @idea = Idea.find(params[:id])
  end

  def update
    idea = Idea.find(params[:id])
    idea.update_attributes(idea_params)
    redirect_to root_path
  end

  def update_quality
    idea = Idea.find(params[:id])
    idea.update_attributes(quality: params[:quality])

    render text: "changed!"
  end

  def destroy
    idea = Idea.find(params[:id])
    idea.destroy

    render text: "buuuuleeted"
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
