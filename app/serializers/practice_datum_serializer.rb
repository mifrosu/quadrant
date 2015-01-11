class PracticeDatumSerializer < ActiveModel::Serializer
  attributes :id, :practice, :month, :count, :value
end
