class NumbersController < ApplicationController
  def index
    @random = Random.new(Time.now.to_i)
  end
end
