import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { updateTemplate } from '&/entities/Template/model/slice/reducers/updateTemplate';
import { addTemplateSectionUnitVariant } from '&/entities/Template/model/slice/reducers/addTemplateSectionUnitVariant';
import { removeTemplateSectionUnitVariant } from '&/entities/Template/model/slice/reducers/removeTemplateSectionUnitVariant';
import { addTemplateSection } from '&/entities/Template/model/slice/reducers/addTemplateSection';
import { addTemplateSectionUnit } from '&/entities/Template/model/slice/reducers/addTemplateSectionUnit';
import { removeTemplateSectionUnit } from '&/entities/Template/model/slice/reducers/removeTemplateSectionUnit';
import { updateTemplateSectionUnit } from '&/entities/Template/model/slice/reducers/updateTemplateSectionUnit';
import { createTemplate } from '&/entities/Template/model/services/createTemplate';
import { createTemplateFulfilled } from '&/entities/Template/model/slice/reducers/createTemplateFulfilled';
import { resetTemplateState } from '&/entities/Template/model/slice/reducers/resetTemplateState';
import { updateTemplate as updateTemplateAsync } from '&/entities/Template/model/services/updateTemplate';
import { updateTemplateFulfilled as updateTemplateAsyncFulfilled } from '&/entities/Template/model/slice/reducers/updateTemplateFulfilled';
import { fetchTemplatesFulfilled } from '&/entities/Template/model/slice/reducers/fetchTemplatesFulfilled';
import { fetchTemplateById } from '&/entities/Template/model/services/fetchTemplateById';
import { fetchTemplateByIdFulfilled } from '&/entities/Template/model/slice/reducers/fetchTemplateByIdFulfilled';
import { fetchTemplateSections } from '&/entities/Template/model/services/fetchTemplateSections';
import { fetchTemplateSectionsFulfilled } from '&/entities/Template/model/slice/reducers/fetchTemplateSectionsFulfilled';
import { resetTemplateEditedSection } from '&/entities/Template/model/slice/reducers/resetTemplateEditedSection';
import { setTemplateEditedSection } from '&/entities/Template/model/slice/reducers/setTemplateEditedSection';
import { updateTemplateSectionById } from '&/entities/Template/model/services/updateTemplateSectionById';
import { patchTemplateSectionFulfilled } from '&/entities/Template/model/slice/reducers/patchTemplateSectionFulfilled';
import { createTemplateSection } from '&/entities/Template/model/services/createTemplateSection';
import { deleteTemplateSection } from '&/entities/Template/model/services/deleteTemplateSection';
import { fetchTemplateBlank } from '&/entities/Template/model/services/fetchTemplateBlank';
import { fetchTemplateBlankFulfilled } from '&/entities/Template/model/slice/reducers/fetchTemplateBlankFulfilled';
import { setTemplateSectionActiveFulfilled } from '&/entities/Template/model/slice/reducers/setTemplateSectionActiveFulfilled';
import { setTemplateSectionActive } from '&/entities/Template/model/services/setTemplateSectionActive';
import { setTemplateIsGlobalTags } from '&/entities/Template/model/slice/reducers/setTemplateIsGlobalTags';
import { setTemplateIsBlank } from '&/entities/Template/model/slice/reducers/setTemplateIsBlank';
import { updateTemplateSectionBlank } from '&/entities/Template/model/services/updateTemplateSectionBlank';
import { updateTemplateAssignUser } from '&/entities/Template/model/slice/reducers/updateTemplateAssignUser';
import { addTemplateAssignUser } from '&/entities/Template/model/slice/reducers/addTemplateAssignUser';
import { removeTemplateAssignUser } from '&/entities/Template/model/slice/reducers/removeTemplateAssignUser';
import { assignTemplate } from '&/entities/Template/model/services/assignTemplate';
import { fetchCases } from '&/entities/Template/model/services/fetchCases';
import { fetchCasesFulfilled } from '&/entities/Template/model/slice/reducers/fetchCasesFulfilled';
import { fetchTemplateCaseById } from '&/entities/Template/model/services/fetchTemplateCaseById';
import { fetchTemplateCaseByIdFulfilled } from '&/entities/Template/model/slice/reducers/fetchTemplateCaseByIdFulfilled';
import { setTemplateIsCase } from '&/entities/Template/model/slice/reducers/setTemplateIsCase';
import { getId } from '&/shared/utils';
import { addTemplateSectionFile } from '&/entities/Template/model/slice/reducers/addTemplateSectionFile';
import { updateTemplateSection } from '&/entities/Template/model/slice/reducers/updateTemplateSection';
import { updateTemplateExcludedSections } from '&/entities/Template/model/slice/reducers/updateTemplateExcludedSections';
import { setTemplateSections } from '&/entities/Template/model/slice/reducers/setTemplateSections';
import { setTemplateFilter } from '&/entities/Template/model/slice/reducers/setTemplateFilter';
import { resetTemplateFilters } from '&/entities/Template/model/slice/reducers/resetTemplateFilters';
import { deleteTemplateFilter } from '&/entities/Template/model/slice/reducers/deleteTemplateFilter';
import { setTemplateStatus } from '&/entities/Template/model/services/setTemplateStatus';
import { setTemplateStatusFulfilled } from '&/entities/Template/model/slice/reducers/setTemplateStatusFulfilled';
import { setTemplateCaseStatus } from '&/entities/Template/model/services/setTemplateCaseStatus';
import { linkTemplateSectionFulfilled } from '&/entities/Template/model/slice/reducers/linkTemplateSectionFulfilled';
import { linkTemplateSection } from '&/entities/Template/model/services/linkTemplateSection';
import { createTemplateCaseDraft } from '&/entities/Template/model/services/createTemplateCaseDraft';
import { createTemplateCaseDraftFulfilled } from '&/entities/Template/model/slice/reducers/createTemplateCaseDraftFulfilled';
import { setTemplateIsDraft } from '&/entities/Template/model/slice/reducers/setTemplateIsDraft';
import { saveTemplateCaseDraft } from '&/entities/Template/model/services/saveTemplateCaseDraft';
import { saveTemplateCaseDraftFulfilled } from '&/entities/Template/model/slice/reducers/saveTemplateCaseDraftFulfilled';
import { setRejected } from './reducers/setRejected';
import { TemplatesSchema } from '../types/TemplatesSchema';
import { fetchTemplates } from '../services/fetchTemplates';
import { setPending } from './reducers/setPending';
import { copyTemplate } from '../services/copyTemplate';
import { copyTemplateFulfilled } from './reducers/copyTemplateFulfilled';
import { deleteTemplateFulfilled } from './reducers/deleteTemplateFulfilled';
import { deleteTemplate } from '../services/deleteTemplate';
import { deleteTemplateCase } from '../services/deleteTemplateCase';
import { deleteTemplateCaseFulfilled } from './reducers/deleteTemplateCaseFulfilled';
import { setTemplateCaseStatusFulfilled } from './reducers/setTemplateCaseStatusFulfilled';
import { fetchCaseDrafts } from '../services/fetchCaseDrafts';
import { fetchCaseDraftsFulfilled } from './reducers/fetchCaseDraftsFulfilled';
import { addTemplateKeyWord } from '&/entities/Template/model/slice/reducers/addTemplateKeyWord';
import { removeTemplateKeyWord } from '&/entities/Template/model/slice/reducers/removeTemplateKeyWord';
import { fetchTemplateKeyWords } from '&/entities/Template/model/services/fetchTemplateKeyWords';
import { fetchTemplateKeyWordsFulfilled } from '&/entities/Template/model/slice/reducers/fetchTemplateKeyWordsFulfilled';
import { resetTemplateAssignUsers } from '&/entities/Template/model/slice/reducers/resetTemplateAssignUsers';

const initialState: TemplatesSchema = {
    error: null,
    loading: false,
    templates: [],
    cases: [],
    template: {
        id: getId('temp_'),
        title: '',
        sections: [],
    },
    templateCase: {},
    editedSection: {},
    newTemplateId: null,
    templateTags: [],
    isGlobalTags: false,
    isBlank: false,
    isCase: false,
    isDraft: false,
    assignUsers: [],
    sectionFilters: {},
    excludedSections: [],
    pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
    },
    filters: {},
    keyWords: [],
};
export const templatesSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        addTemplateAssignUser,
        addTemplateKeyWord,
        addTemplateSection,
        addTemplateSectionFile,
        addTemplateSectionUnit,
        addTemplateSectionUnitVariant,
        deleteTemplateFilter,
        removeTemplateAssignUser,
        removeTemplateKeyWord,
        removeTemplateSectionUnit,
        removeTemplateSectionUnitVariant,
        resetTemplateAssignUsers,
        resetTemplateEditedSection,
        resetTemplateFilters,
        resetTemplateState,
        setTemplateEditedSection,
        setTemplateFilter,
        setTemplateIsBlank,
        setTemplateIsCase,
        setTemplateIsDraft,
        setTemplateIsGlobalTags,
        setTemplateSections,
        updateTemplate,
        updateTemplateAssignUser,
        updateTemplateExcludedSections,
        updateTemplateSection,
        updateTemplateSectionUnit,
    },
    extraReducers: (builder: ActionReducerMapBuilder<TemplatesSchema>) => {
        builder
            .addCase(fetchTemplates.pending, setPending)
            .addCase(fetchTemplates.rejected, setRejected)
            .addCase(fetchTemplates.fulfilled, fetchTemplatesFulfilled)

            .addCase(fetchTemplateKeyWords.pending, setPending)
            .addCase(fetchTemplateKeyWords.rejected, setRejected)
            .addCase(fetchTemplateKeyWords.fulfilled, fetchTemplateKeyWordsFulfilled)

            .addCase(fetchCases.pending, setPending)
            .addCase(fetchCases.rejected, setRejected)
            .addCase(fetchCases.fulfilled, fetchCasesFulfilled)

            .addCase(createTemplate.pending, setPending)
            .addCase(createTemplate.rejected, setRejected)
            .addCase(createTemplate.fulfilled, createTemplateFulfilled)

            .addCase(updateTemplateAsync.pending, setPending)
            .addCase(updateTemplateAsync.rejected, setRejected)
            .addCase(updateTemplateAsync.fulfilled, updateTemplateAsyncFulfilled)

            .addCase(fetchTemplateById.pending, setPending)
            .addCase(fetchTemplateById.rejected, setRejected)
            .addCase(fetchTemplateById.fulfilled, fetchTemplateByIdFulfilled)

            .addCase(fetchTemplateCaseById.pending, setPending)
            .addCase(fetchTemplateCaseById.rejected, setRejected)
            .addCase(fetchTemplateCaseById.fulfilled, fetchTemplateCaseByIdFulfilled)

            .addCase(fetchTemplateBlank.pending, setPending)
            .addCase(fetchTemplateBlank.rejected, setRejected)
            .addCase(fetchTemplateBlank.fulfilled, fetchTemplateBlankFulfilled)

            .addCase(fetchTemplateSections.pending, setPending)
            .addCase(fetchTemplateSections.rejected, setRejected)
            .addCase(fetchTemplateSections.fulfilled, fetchTemplateSectionsFulfilled)

            .addCase(createTemplateSection.pending, setPending)
            .addCase(createTemplateSection.rejected, setRejected)
            .addCase(createTemplateSection.fulfilled, patchTemplateSectionFulfilled)

            .addCase(updateTemplateSectionById.pending, setPending)
            .addCase(updateTemplateSectionById.rejected, setRejected)
            .addCase(updateTemplateSectionById.fulfilled, patchTemplateSectionFulfilled)

            .addCase(updateTemplateSectionBlank.pending, setPending)
            .addCase(updateTemplateSectionBlank.rejected, setRejected)
            .addCase(updateTemplateSectionBlank.fulfilled, patchTemplateSectionFulfilled)

            .addCase(deleteTemplateSection.pending, setPending)
            .addCase(deleteTemplateSection.rejected, setRejected)
            .addCase(deleteTemplateSection.fulfilled, patchTemplateSectionFulfilled)

            .addCase(setTemplateSectionActive.pending, setPending)
            .addCase(setTemplateSectionActive.rejected, setRejected)
            .addCase(setTemplateSectionActive.fulfilled, setTemplateSectionActiveFulfilled)

            .addCase(assignTemplate.pending, setPending)
            .addCase(assignTemplate.rejected, setRejected)

            .addCase(copyTemplate.pending, setPending)
            .addCase(copyTemplate.rejected, setRejected)
            .addCase(copyTemplate.fulfilled, copyTemplateFulfilled)

            .addCase(deleteTemplate.pending, setPending)
            .addCase(deleteTemplate.rejected, setRejected)
            .addCase(deleteTemplate.fulfilled, deleteTemplateFulfilled)

            .addCase(deleteTemplateCase.pending, setPending)
            .addCase(deleteTemplateCase.rejected, setRejected)
            .addCase(deleteTemplateCase.fulfilled, deleteTemplateCaseFulfilled)

            .addCase(setTemplateStatus.pending, setPending)
            .addCase(setTemplateStatus.rejected, setRejected)
            .addCase(setTemplateStatus.fulfilled, setTemplateStatusFulfilled)

            .addCase(setTemplateCaseStatus.pending, setPending)
            .addCase(setTemplateCaseStatus.rejected, setRejected)
            .addCase(setTemplateCaseStatus.fulfilled, setTemplateCaseStatusFulfilled)

            .addCase(linkTemplateSection.pending, setPending)
            .addCase(linkTemplateSection.rejected, setRejected)
            .addCase(linkTemplateSection.fulfilled, linkTemplateSectionFulfilled)

            .addCase(createTemplateCaseDraft.pending, setPending)
            .addCase(createTemplateCaseDraft.rejected, setRejected)
            .addCase(createTemplateCaseDraft.fulfilled, createTemplateCaseDraftFulfilled)

            .addCase(saveTemplateCaseDraft.pending, setPending)
            .addCase(saveTemplateCaseDraft.rejected, setRejected)
            .addCase(saveTemplateCaseDraft.fulfilled, saveTemplateCaseDraftFulfilled)

            .addCase(fetchCaseDrafts.pending, setPending)
            .addCase(fetchCaseDrafts.rejected, setRejected)
            .addCase(fetchCaseDrafts.fulfilled, fetchCaseDraftsFulfilled);
    },
});

export const { actions: templatesActions } = templatesSlice;
export const { reducer: templatesReducer } = templatesSlice;
