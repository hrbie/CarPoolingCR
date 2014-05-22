class Viaje < ActiveRecord::Base
  belongs_to :usuario
  has_many :solicituds
end
