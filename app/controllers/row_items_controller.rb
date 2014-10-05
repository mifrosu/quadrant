class RowItemsController < ApplicationController
  before_action :set_row_item, only: [:show, :edit, :update, :destroy]

  # GET /row_items
  # GET /row_items.json
  def index
    @row_items = RowItem.all
  end

  # GET /row_items/1
  # GET /row_items/1.json
  def show
  end

  # GET /row_items/new
  def new
    @row_item = RowItem.new
  end

  # GET /row_items/1/edit
  def edit
  end

  # POST /row_items
  # POST /row_items.json
  def create
    @row_item = RowItem.new(row_item_params)

    respond_to do |format|
      if @row_item.save
        format.html { redirect_to @row_item, notice: 'Row item was successfully created.' }
        format.json { render :show, status: :created, location: @row_item }
      else
        format.html { render :new }
        format.json { render json: @row_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /row_items/1
  # PATCH/PUT /row_items/1.json
  def update
    respond_to do |format|
      if @row_item.update(row_item_params)
        format.html { redirect_to @row_item, notice: 'Row item was successfully updated.' }
        format.json { render :show, status: :ok, location: @row_item }
      else
        format.html { render :edit }
        format.json { render json: @row_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /row_items/1
  # DELETE /row_items/1.json
  def destroy
    @row_item.destroy
    respond_to do |format|
      format.html { redirect_to row_items_url, notice: 'Row item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_row_item
      @row_item = RowItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def row_item_params
      params.require(:row_item).permit(:id_text, :x_data, :y_data, :z_data, :data_set_id)
    end
end
