class PracticeDataController < ApplicationController
  before_action :set_practice_datum, only: [:show, :edit, :update, :destroy]

  # GET /practice_data
  # GET /practice_data.json
  def index
    @practice_data = PracticeDatum.all.order(month: :asc, practice: :asc)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @practice_data }
    end
  end

  # GET /practice_data/1
  # GET /practice_data/1.json
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @practice_datum }
    end
  end

  # GET /practice_data/new
  def new
    @practice_datum = PracticeDatum.new
  end

  # GET /practice_data/1/edit
  def edit
  end

  # POST /practice_data
  # POST /practice_data.json
  def create
    @practice_datum = PracticeDatum.new(practice_datum_params)

    respond_to do |format|
      if @practice_datum.save
        format.html { redirect_to @practice_datum, notice: 'Practice datum was successfully created.' }
        format.json { render json: @practice_datum, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @practice_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /practice_data/1
  # PATCH/PUT /practice_data/1.json
  def update
    respond_to do |format|
      if @practice_datum.update(practice_datum_params)
        format.html { redirect_to @practice_datum, notice: 'Practice datum was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @practice_datum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /practice_data/1
  # DELETE /practice_data/1.json
  def destroy
    @practice_datum.destroy
    respond_to do |format|
      format.html { redirect_to practice_data_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_practice_datum
      @practice_datum = PracticeDatum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def practice_datum_params
      params.require(:practice_datum).permit(:practice, :month, :count, :value)
    end
end
