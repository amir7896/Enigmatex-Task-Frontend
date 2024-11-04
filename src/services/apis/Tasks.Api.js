import { api } from "../../utils";
import {
  GET_TASKS,
  CREATE_TASK,
  GET_SINGLE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../apiConstants";

class TaskApi {
  static sharedIstance = new TaskApi();

  constructor() {
    if (TaskApi.sharedIstance != null) {
      return TaskApi.sharedIstance;
    }
  }

  //   Get Tasks
  async getTasks() {
    try {
      const response = await api.get(GET_TASKS);
      const { success, data } = response.data;
      if (success) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  //   Create Task
  async createTask(body) {
    try {
      const response = await api.post(CREATE_TASK, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  //   Get Single Task
  async getSingleTask(id) {
    try {
      const response = await api.get(`${GET_SINGLE_TASK}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  //   Update Task
  async updateTask(body, id) {
    try {
      const response = await api.put(`${UPDATE_TASK}/${id}`, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  //   Delete Task
  async deleteTask(id) {
    try {
      const response = await api.delete(`${DELETE_TASK}/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default TaskApi.sharedIstance;
